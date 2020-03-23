const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { 
        type: String, 
        required: true 
    },
    alias: {
        type: String
    },
    phone: { 
        type: Number, 
        unique: true 
    },
    status: {
        type: String, 
        enum: ['Regular', 'Valued'],
        required: true
    },
    discount: {
        type: Map,
        of: Number,
        min: 0,
        max: 100,
    }
});

module.exports = mongoose.model('Customer', customerSchema);