const User = require('../models/userModel');

//register
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const registeredUser = await User.create({ username, password });
        if (!username || !password) res.status(400).json('Please fill in both fields');
        res.status(201).json(registeredUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const loggedInUser = await User.create({ username, password });
        if (!username || !password) res.status(400).json('Please fill in both fields');
        res.status(201).json(loggedInUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { registerUser, loginUser };