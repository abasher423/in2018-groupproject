const mongoose = require("mongoose");

const Transaction = require("../models/transaction");

exports.transactions_get_all = (req, res, next) => {
    // finds all elements (add .where/limit)
    Transaction.find()
    // fetch these fields and no other fields
    .select('currency amount date blank')
     .exec()
     .then(docs => {
         const response = {
             count: docs.length,
             transactions: docs.map(doc => {
                 return {
                     _id: doc._id,
                     currency: doc.currency,
                     amount: doc.amount,
                     date: doc.date,
                     blank: doc.blank,
                     message: 'successfully worked'
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
    const transaction = new Transaction({
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
    transaction
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Created transaction successfully',
            createdTransaction: {
                _id: result._id,
                currency: result.currency,
                amount: result.amount,
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
    const id = req.params.transactionId;
    Transaction.findById(id)
    .select('currency amount date blank')
     .exec()
     .then(doc => {
         console.log("from the database", doc);
         if (doc) {
             res.status(200).json({
                 transaction: doc,
             });
         } else {
             res.status(404).json({message: 'No valid entry found for provided ID'});
         }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
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