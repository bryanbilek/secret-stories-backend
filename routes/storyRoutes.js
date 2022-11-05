const router = require('express').Router();
const { getStories, getStory, addStory, updateStory, deleteStory } = require('../controllers/storyControllers');

//GET stories
router.get('/', getStories);

//GET story by _id
router.get('/:id', getStory);

//POST story
router.post('/', addStory);

//PUT story
router.put('/:id', updateStory);

//DELETE story
router.delete('/:id', deleteStory);

module.exports = router;