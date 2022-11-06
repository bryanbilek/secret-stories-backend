const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) res.status(400).json('Please fill in both fields');
        //check if the username is already in the db
        const uniqueOrNot = await User.findOne({ username });
        if (uniqueOrNot) res.status(403).json('Sorry, username already exists');
        //hash the password 10 rounds
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        //create the user with the hashed password
        const registeredUser = await User.create({ username, password: hash });
        //generate a token for the user when they register
        const token = generateToken(registeredUser._id, registeredUser.username);
        res.status(201).json({ registeredUser, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) res.status(400).json('Please fill in both fields');
        //find the user to login
        const findUser = await User.findOne({ username });
        if (!findUser) res.status(404).json('User not found');
        //compare the found user's password with the password of the request coming in
        const compare = await bcrypt.compare(password, findUser.password);
        if (!compare) res.status(401).json('Invalid credentials');
        //if everything has checked out log in the request successfully 
        const loggedInUser = await User.create({ username, password });
        //generate a token for the user when they login
        const token = generateToken(loggedInUser._id, loggedInUser.username);
        res.status(201).json({ loggedInUser, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//function to generate a token that includes the id & the username
function generateToken(_id, username) {
    const secret = process.env.JWT_SECRET || `If I tell you the secret it isn't a secret`;
    const token = jwt.sign({ _id, username }, secret, { expiresIn: '1d' });
    return token;
}

module.exports = { registerUser, loginUser };