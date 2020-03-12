const mongoose = require("mongoose");

const Order = require("../models/customer");

exports.customers_get_all = (req, res, next) => {
    res.status(200).json({
        message: 'got em'
    });
}
exports.customers_create_customer = (req, res, next) => {
    res.status(200).json({
        message: 'created'
    });
}
exports.customers_get_customer = (req, res, next) => {
    res.status(200).json({
        message: 'got it'
    });
}
exports.customers_update_customer = (req, res, next) => {
    res.status(200).json({
        message: 'updated'
    });
}
exports.customers_delete_customer = (req, res, next) => {
    res.status(200).json({
        message: 'deleted'
    });
}
