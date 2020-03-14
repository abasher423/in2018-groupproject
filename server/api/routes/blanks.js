const express = require("express");
const router = express.Router();

const blanksController = require('../controllers/blanks');

// Handle incoming GET requests to /blanks
router.get("/", blanksController.blanks_get_all);

router.post("/", blanksController.blanks_create_blank);

router.get("/:blankId", blanksController.blanks_get_blank);

router.patch("/:blankId", blanksController.blanks_update_blank);

router.delete("/:blankId", blanksController.blanks_delete_blank);


module.exports = router;
