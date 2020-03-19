const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Order = require("../models/user");

exports.users_get_all = (req, res, next) => {
    res.status(200).json({
        message: 'got em'
    });
}
exports.user_signup = (req, res, next) => {
    res.status(200).json({
        message: `signed up`
    });
}
exports.user_login = (req, res, next) => {
    res.status(200).json({
        message: `logged in  ${req.body.email}!`
    });
}
exports.users_update_user = (req, res, next) => {
    res.status(200).json({
        message: 'updated'
    });
}
exports.users_delete_user = (req, res, next) => {
    res.status(200).json({
        message: 'deleted'
    });
}