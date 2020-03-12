const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
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
    advisorNumber: {
        type: Number,
        min: 100,
        max: 999,
        required: function() {
            return this.priviledge === 'Advisor';
        }
    }
});

module.exports = mongoose.model('User', userSchema);