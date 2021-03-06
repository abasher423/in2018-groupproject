const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    currency: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }, 
    conversionRate: {
        type: Number,
        min: 0,
        max: 99999,
        required: function() {
            return this.currency !== 'USD';
        }
    },
    blank: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Blank',
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
    },
    datePaid: {
        type: Date
    },
    paymentType: {
        type: String,
        enum: ['Cash', 'Card', 'Delayed'],
        required: true
    },
    cardNumber: {
        type: Number,
        required: function() {
            return this.paymentType === 'Card';
        }
    },
    cardType: {
        type: String,
        required: function() {
            return this.paymentType === 'Card';
        }
    },
    commission: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    taxLocal: {
        type: Number,
        required: true
    },
    taxOther: {
        type: Number,
        required: true
    },
    refunded: {
        type: Boolean,
        default: false
    }
});

transactionSchema.virtual('paid').get(function() {
    if(this.datePaid || this.paymentType != "Delayed"){
        return "Yes"
    } else {
        return "No"
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);