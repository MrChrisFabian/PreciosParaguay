const express = require("express");
const UserController = require("../controllers/user.controller");
const UserRouter = express.Router();
const multer = require('multer');
const multerConfig = require("../config/multer.config");
const upload = multer(multerConfig);

// Rutas para operaciones de autenticación de usuarios
UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.post("/logout", UserController.logout);
UserRouter.put("/:id", UserController.updateUserById);

// Ruta para subir la imagen de perfil con el ID del usuario
UserRouter.post("/upload/:id", upload.single('image'), UserController.UploadProfile);

module.exports = UserRouter;
