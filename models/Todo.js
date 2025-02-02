const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('Todo', todoSchema);