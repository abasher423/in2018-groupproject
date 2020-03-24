const mongoose = require("mongoose");

const Blank = require("../models/blank");

exports.blanks_get_all = (req, res, next) => {
    Blank.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        blanks: docs.map(doc => {
          return {
            type: doc.type,
            number: doc.number,
            dateAdded: doc.dateAdded,
            advisor: doc.advisor,
            dateAssigned: doc.dateAssigned,
            coupons: doc.coupons,
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
exports.blanks_create_blank = (req, res, next) => {
    const blank = new Blank({
        _id: new mongoose.Types.ObjectId(),
        uniqueNumber: req.body.uniqueNumber,
        dateAdded: req.body.dateAdded,
        advisor: req.body.advisor,
        dateAssigned: req.body.dateAssigned,
        coupons: req.body.coupons
    });
    blank
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created blank successfully",
            createdProduct: {
              type: result.type,
              number: result.number,
              _id: result._id
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
exports.blanks_get_blank = (req, res, next) => {
    const id = req.params.blankId;
    Blank.findById(id)
      .select("type number uniqueNumber dateAdded advisor dateAssigned coupons")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc
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
exports.blanks_update_blank = (req, res, next) => {
  const id = req.params.blankId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Blank.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Blank updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.blanks_delete_blank = (req, res, next) => {
    const id = req.params.blankId;
    Blank.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Blank deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}