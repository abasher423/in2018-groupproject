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
    },
    lateOnPayment: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Customer', customerSchema);