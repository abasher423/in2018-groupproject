const mongoose = require("mongoose");

const Order = require("../models/blank");

exports.blanks_get_all = (req, res, next) => {
    res.status(200).json({
        message: 'got em'
    });
}
exports.blanks_create_blank = (req, res, next) => {
    res.status(200).json({
        message: 'created'
    });
}
exports.blanks_get_blank = (req, res, next) => {
    res.status(200).json({
        message: 'got it'
    });
}
exports.blanks_update_blank = (req, res, next) => {
    res.status(200).json({
        message: 'updated'
    });
}
exports.blanks_delete_blank = (req, res, next) => {
    res.status(200).json({
        message: 'deleted'
    });
}