const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    //each story given an id to track what user told which story for CRUD
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Story', storySchema);