const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    status: {
        type: String, 
        enum: ['Normal', 'Special'],
        required: true
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    }
});

module.exports = mongoose.model('Customer', customerSchema);