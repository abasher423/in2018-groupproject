const express = require("express");
const router = express.Router();

const usersController = require('../controllers/users');

// Handle incoming GET requests to /users
router.get("/", usersController.users_get_all);

router.post("/signup", usersController.user_signup);

router.post("/login", usersController.user_login);

router.patch("/:userId", usersController.users_update_user);

router.delete("/:userId", usersController.users_delete_user);


module.exports = router;