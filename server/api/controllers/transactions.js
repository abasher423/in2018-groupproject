const mongoose = require("mongoose");

const Transaction = require("../models/transaction");

exports.transactions_get_all = (req, res, next) => {
    // finds all elements (add .where/limit)
    Transaction.find()
    // fetch these fields and no other fields
    //.select('c')
     .exec()
     .then(docs => {
         const response = {
             count: docs.length,
             transactions: docs.map(doc => {
                 return {
                     currency: docs.currency,
                     amount: docs.amount,
                     date: docs.date,
                     blank: docs.blank,
                     request: {
                         type: 'GET', 
                         url: 'http://localhost:3000/products/' + docs.blank
                     }
                 }
             })
         }
         res.status(200).json(response);
     })
     .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
     });
}

exports.transactions_create_transaction = (req, res, next) => {
    console.log(req.file);
    // product your planning on storing
    const transactions = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        currency: req.body.currency,
        amount: req.body.amount,
        date: req.body.date,
        conversionRate: req.body.conversionRate,
        blank: req.body.blank,
        paymentType: req.body.paymentType,
        commision: req.body.commision,
        taxLocal: req.body.taxLocal,
        taxOther: req.body.taxOther
    });
    transactions
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Created transaction successfully',
            createdProducted: {
                _id: result._id,
                currency: result.currency,
                amount: result.amount,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });   
}

exports.transactions_get_transaction = (req, res, next) => {
    res.status(200).json({
        message: 'got it'
    });
}
exports.transactions_update_transaction = (req, res, next) => {
    res.status(200).json({
        message: 'updated'
    });
}
exports.transactions_delete_transaction = (req, res, next) => {
    res.status(200).json({
        message: 'deleted'
    });
}