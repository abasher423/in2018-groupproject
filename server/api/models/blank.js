const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    origin: String,
    destination: String
});

const blankSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uniqueNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 9,
        maxlength:11,
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
    coupons: [couponSchema],

    used: {
        type: Boolean,
        default: false
    }
});

blankSchema.virtual('type').get(function() {
    return this.uniqueNumber.slice(0,3);
});

blankSchema.virtual('number').get(function() {
    return this.uniqueNumber.slice(3);
});

module.exports = mongoose.model('Blank', blankSchema);