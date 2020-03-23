const mongoose = require("mongoose");

const Customer = require("../models/customer");

exports.customers_get_all = (req, res, next) => {
    Customer.find()
    .select("_id fullName alias phone status discount")
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            customers: docs.map(doc => {
              return {
                id: doc._id,
                fullName: doc.fullName,
                alias: doc.alias,
                phone: doc.phone,
                status: doc.status,
                discount: doc.discount
              };
            })
          });
    })
    .catch(err => {
        res.status(500).json({
          error: err
        });
    });
};
exports.customers_create_customer = (req, res, next) => {
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        alias: req.body.alias,
        phone: req.body.phone,
        status: req.body.status,
        discount: req.body.discount
      });
      customer
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created customer successfully",
            createdCustomer: {
              fullName: result.fullName,
              alias: result.alias,
              _id: result._id,
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
}
exports.customers_get_customer = (req, res, next) => {
    const id = req.params.customerId;
    Customer.findById(id)
    .select("_id fullName alias phone status discount")
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
                res.status(200).json({
                    customer: doc
                });
        } else {
            res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}
exports.customers_update_customer = (req, res, next) => {
    const id = req.params.customerId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Customer.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Customer updated",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
exports.customers_delete_customer = (req, res, next) => {
    const id = req.params.customerId;
    Customer.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Customer deleted",
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}
