const Story = require('../models/storyModel');

//GET stories
const getStories = async (req, res) => {
    try {
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
        const addedStory = await Story.create({ author, title, body, user_id });
        if (!title || !body) res.status(400).json('Please fill in both fields');
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
        const updatedStory = await Story.findByIdAndUpdate({ id }, { author, title, body });
        if (!story) res.status(404).json('Problem finding story');
        if (!title || !body) res.status(400).json('Please fill in both fields');
        res.status(201).json(updatedStory);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//DELETE story
const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStory = await Story.findByIdAndDelete(id);
        if (!deletedStory) res.status(404).json('Problem finding story');
        res.status(204).json(deletedStory);
    } catch (error) {
        res.status(500).json(error.message);
    }    
};

module.exports = { getStories, getStory, addStory, updateStory, deleteStory };