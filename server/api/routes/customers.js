const express = require("express");
const router = express.Router();

const customersController = require('../controllers/customers');

// Handle incoming GET requests to /customers
router.get("/", customersController.customers_get_all);

router.post("/", customersController.customers_create_customer);

router.get("/:customerId", customersController.customers_get_customer);

router.patch("/:customerId", customersController.customers_update_customer);

router.delete("/:customerId", customersController.customers_delete_customer);


module.exports = router;

