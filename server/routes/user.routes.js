const express = require("express");
const UserController = require("../controllers/user.controller");

const UserRouter = express.Router();

///api/auth
UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.post("/logout", UserController.logout);
UserRouter.put("/:id", UserController.updateUserById);


module.exports = UserRouter