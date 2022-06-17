const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const postSchema = Schema({
    title: {
        type: String,
        minlength: [20, 'min length is 20 character'],
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        minlength: [200, 'min length is 200 character'],
        required: [true, 'Title is required']
    },
    category: {
        type: String,
        minlength: [3, 'min length is 3 character'],
        required: [true, 'Category is required']
    },
    status: {
        type: String,
        enum: ['publish', 'draft', 'thrash'],
        required: [true, 'Status is required']
    },
})

module.exports = model('Post', postSchema);