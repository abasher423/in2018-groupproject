const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    password: { 
        type: String, 
        required: true 
    },
    priviledge: {
        type: String,
        enum: ['Admin', 'Manager', 'Advisor'],
        required: true
    },
    name: {
        type: String,
    },
    uniqueNumber: {
        type: Number,
        min: 100,
        max: 999,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('User', userSchema);