const Story = require('../models/storyModel');
const jwt = require('jsonwebtoken');

//GET stories
const getStories = async (req, res) => {
    try {
        //get all stories in the db
        const stories = await Story.find();
        if (!stories) res.status(404).json('Problem finding stories');
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//GET story
const getStory = async (req, res) => {
    try {
        const { id } = req.params;
        //get the story by its id
        const story = await Story.findById(id);
        if (!story) res.status(404).json('Problem finding story');
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//POST story
const addStory = async (req, res) => {
    try {
        const { author, title, body, user_id } = req.body;
        if (!title || !body) res.status(400).json('Please fill in both fields');
        //track the story to the author by decoding the _id out of the token with the secret
        const token = req.headers.authorization;
        const secret = process.env.JWT_SECRET || `If I told you the secret it isn't a secret`;
        const { _id } = jwt.verify(token, secret);
        //add the story
        const addedStory = await Story.create({ author, title, body, user_id: _id });
        res.status(201).json(addedStory);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//PUT story
const updateStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, title, body } = req.body;
        if (!title || !body) res.status(400).json('Please fill in both fields');
        //only allow the user who wrote their story to update it
        const token = req.headers.authorization;
        const secret = process.env.JWT_SECRET || `If I told you the secret it isn't a secret`;
        const { _id } = jwt.verify(token, secret);
        //find the story & update it
        const updatedStory = await Story.findByIdAndUpdate({ _id: id }, { author, title, body });
        if (!story) res.status(404).json('Problem finding story');
        res.status(201).json(updatedStory);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//DELETE story
const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        //only allow an user to delete their own stories
        const token = req.headers.authorization;
        const secret = process.env.JWT_SECRET || `If I told you the secret it isn't a secret`;
        const { _id } = jwt.verify(token, secret);
        //find the story and delete it
        const deletedStory = await Story.findByIdAndDelete({ _id: id });
        if (!deletedStory) res.status(404).json('Problem finding story');
        res.status(204).json(deletedStory);
    } catch (error) {
        res.status(500).json(error.message);
    }    
};

module.exports = { getStories, getStory, addStory, updateStory, deleteStory };