const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    origin: String,
    destination: String
});

const blankSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: { 
        type: String,
        enum: ['444', '440', '420', '201', '101', '451', '452'],
        required: true
    },
    uniqueNumber: {
        type: String,
        unique: true,
        required: true,
        minlength: 6,
        maxlength: 8,
        match: /[0-9]*/
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    advisor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'  
    },
    dateAssigned:{
        type: Date
    },
    coupons: [couponSchema]
});

module.exports = mongoose.model('Blank', blankSchema);