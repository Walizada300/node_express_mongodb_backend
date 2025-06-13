const mongoose = require('mongoose');
const hadisSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    dari: {
        type: String,
        required: true
    },
    pashto: {
        type: String,
        required: true
    },
    english: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Hadis', hadisSchema);