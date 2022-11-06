const router = require('express').Router();
const { getStories, getStory, addStory, updateStory, deleteStory } = require('../controllers/storyControllers');
const authorized = require('../middleware/authorization');

//GET stories
router.get('/', authorized, getStories);

//GET story by _id
router.get('/:id', authorized, getStory);

//POST story
router.post('/', authorized, addStory);

//PUT story
router.put('/:id', authorized, updateStory);

//DELETE story
router.delete('/:id', authorized, deleteStory);

module.exports = router;