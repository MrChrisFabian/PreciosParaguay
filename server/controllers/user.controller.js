const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    updateUserById: async (req, res) => {
        const userId = req.params.id;
        const updatedUserData = req.body; // Datos actualizados del usuario enviados por el cliente

        // Verificar si se está actualizando la contraseña
        if (updatedUserData.password) {
            // Hashear la nueva contraseña
            const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
            updatedUserData.password = hashedPassword;
        }

        UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true })
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
            })
            .catch(err => res.status(500).json({ error: err }));
    },

    register: (req, res) => {
        const user = new UserModel(req.body);
        user
            .save()
            .then(() => {
                res.json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
    },
    logout: (req, res) => {
        // clear the cookie from the response
        res.clearCookie("usertoken");
        res.status(200).json({
            message: "You have successfully logged out of our system",
        });
    }, 
    login: (req, res) => {
        UserModel.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.status(400).json({ msg: "invalid login attempt" });
                } else {
                    if (req.body.password === undefined) {
                        res.status(400).json({ msg: "invalid login attempt" });
                    }
                    console.log(req.body)
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            console.log("passwordIsValid: ", passwordIsValid);
                            if (passwordIsValid) {
                                const userInfo = {
                                    _id: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                };
                                console.log("userInfo: ", userInfo);

                                const secret = "mysecret";
                                const newJWT = jwt.sign(userInfo, secret)
                                console.log("newJWT: ", newJWT);
                                res
                                    .status(200)
                                    .cookie("usertoken", newJWT, {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 900000000),
                                    })
                                    .json({ msg: "success!", user: userInfo, newJWT });
                            } else {
                                res.status(401).json({ msg: "invalid login attempt" });
                            }
                        })
                        .catch(err => res.status(401).json({ msg: "invalid login attempt", error: err }));
                }
            })
            .catch(err => res.status(401).json({ error: err }));
    },
        UploadProfile: async (req, res) => {
            const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
            const profileImage = req.file; // Obtener el archivo de imagen del cuerpo de la solicitud
    
            try {
                if (!profileImage) {
                    return res.status(400).json({ message: "No se ha proporcionado ninguna imagen de perfil" });
                }
    
                // Obtener la URL de la imagen de perfil
                const imageUrl = `http://localhost:8000/uploads/${profileImage.filename}`;
    
                // Actualizar el campo 'profile' en el modelo de usuario
                await UserModel.findByIdAndUpdate(userId, { profile: imageUrl });
    
                res.json({ imageUrl, message: "Imagen de perfil subida y guardada correctamente" });
            } catch (error) {
                console.error("Error al procesar la imagen de perfil:", error);
                res.status(500).json({ message: "Error al procesar la imagen de perfil" });
            }
        }
    };
