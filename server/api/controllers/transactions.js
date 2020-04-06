const mongoose = require("mongoose");
const moment = require('moment');

const Transaction = require("../models/transaction");

exports.transactions_get_all = (req, res, next) => {
    // finds all elements (add .where/limit)
    Transaction.find()
    .populate({ 
        path:"blank",
        select: "uniqueNumber advisor",
        populate: { 
            path: "advisor",
            select: "name -_id uniqueNumber"
        }
    })
    .populate("customer", "fullName")
    .sort([['date', -1]])
     .exec()
     .then(docs => {
         const response = {
             count: docs.length,
             transactions: docs.map(doc => {
                 return {
                     _id: doc._id,
                     date: moment(doc.date).format('MMMM Do YYYY'),
                     currency: doc.currency,
                     amount: doc.amount,
                     conversionRate: doc.conversionRate,
                     blank: doc.blank,
                     customer: doc.customer,
                     datePaid: doc.datePaid,
                     paymentType: doc.paymentType,
                     cardNumber: doc.cardNumber,
                     cardType: doc.cardType,
                     commision: doc.commision,
                     taxLocal: doc.taxLocal,
                     taxOther: doc.taxOther,
                     paid: doc.paid
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
        customer: req.body.customer,
        datePaid: req.body.datePaid,
        paymentType: req.body.paymentType,
        cardNumber: req.body.cardNumber,
        cardType: req.body.cardType,
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
                date: result.date,
                conversionRate: result.conversionRate,
                blank: result.blank,
                customer: result.customer,
                datePaid: result.datePaid,
                paymentType: result.paymentType,
                cardNumber: result.cardNumber,
                cardType: result.cardType,
                commision: result.commision,
                taxLocal: result.taxLocal,
                taxOther: result.taxOther
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
    const id = req.params.transactionId; 
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }   
    Transaction.update({_id: id}, { $set: updateOps })
     .exec()
     .then(result => {
         console.log(result);
         res.status(200).json({
             message: 'Transaction Updated!',
         });
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error: err
         });
     });
}

exports.transactions_delete_transaction = (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.remove({ _id: id })
     .exec()
     .then(result => {
        res.status(200).json({
            message: 'Transaction removed'
        });
     })
     .catch(err => {
         res.status(500).json({
             error: err
         })
     })
}