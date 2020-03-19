const express = require("express");
const router = express.Router();

const transactionsController = require('../controllers/transactions');

// Handle incoming GET requests to /transactions
router.get("/", transactionsController.transactions_get_all);

router.post("/", transactionsController.transactions_create_transaction);

router.get("/:transactionId", transactionsController.transactions_get_transaction);

router.patch("/:transactionId", transactionsController.transactions_update_transaction);

router.delete("/:transactionId", transactionsController.transactions_delete_transaction);


module.exports = router;
