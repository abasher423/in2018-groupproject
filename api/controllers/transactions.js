const mongoose = require("mongoose");

const Order = require("../models/transaction");

exports.transactions_get_all = (req, res, next) => {
    res.status(200).json({
        message: 'got em'
    });
}
exports.transactions_create_transaction = (req, res, next) => {
    res.status(200).json({
        message: 'created'
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