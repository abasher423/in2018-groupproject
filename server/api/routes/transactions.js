const express = require("express");
const router = express.Router();

const transactionsController = require('../controllers/transactions');

// Handle incoming GET requests to /transactions
router.get("/", transactionsController.transactions_get_all);

router.post("/", transactionsController.transactions_create_transaction);

router.get("/:transactionId", transactionsController.transactions_get_transaction);

router.get("/getByBlankId/:blankId", transactionsController.transactions_get_transaction_by_b_id);

router.patch("/:transactionId", transactionsController.transactions_update_transaction);

router.delete("/:transactionId", transactionsController.transactions_delete_transaction);

router.get("/calculateDiscount/:customerId", transactionsController.transactions_get_discount);

router.get("/report/IndDomReport/:info", transactionsController.transactions_ind_dom_report);

module.exports = router;
