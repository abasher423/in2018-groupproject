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
        required: true  
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: true
    },
    paymentType: {
        type: String,
        enum: ['Cash', 'Card', 'Delayed'],
        required: true
    },
    cardDetails: {
        type: Number,
        required: function() {
            return this.paymentType === 'Card';
        }
    },
    commision: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);