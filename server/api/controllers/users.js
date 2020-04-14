const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.users_get_all = (req, res, next) => {
    User.find()
    .select("name priviledge _id uniqueNumber")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            priviledge: doc.priviledge,
            uniqueNumber: doc.uniqueNumber,
            _id: doc._id
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.user_signup = (req, res, next) => {
    User.findOne({ uniqueNumber: req.body.uniqueNumber })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          message: "User exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              uniqueNumber: req.body.uniqueNumber,
              password: hash,
              name: req.body.name,
              priviledge: req.body.priviledge
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
}
exports.user_login = (req, res, next) => {
    User.findOne({ uniqueNumber: req.body.uniqueNumber })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              uniqueNumber: user.uniqueNumber,
              priviledge: user.priviledge,
              _id: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: {
              uniqueNumber: user.uniqueNumber,
              priviledge: user.priviledge,
              _id: user._id
            }
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.users_update_user = (req, res, next) => {
    res.status(200).json({
        message: 'updated'
    });
}
exports.users_delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};