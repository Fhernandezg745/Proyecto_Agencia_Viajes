const { body } = require("express-validator");
const { user } = require('../database/models/index')
const { compareSync } = require("bcryptjs");

const login = [
    //Email
    body("email")
    .notEmpty()
    .withMessage("El email no puede quedar vacío.")
    .bail()
    .isEmail()
    .withMessage("El formato de email no es válido.")
    .bail()
    .custom(async(value) => {
        let users = await user.findAll()
        users = users.map(u => u.email)
        if (!users.includes(value)) {
            throw new Error("El email no está registrado")
        }
        return true;
    }),
    //Pass
    body("password")
    .notEmpty()
    .withMessage("La contraseña no puede quedar vacía.")
    .bail()
    .isLength({ min: 4 })
    .bail()
    .custom(async(value, { req }) => {
        let { email } = req.body
        let users = await user.findAll()
        let user = users.find(u => u.email === email);
        if (!user) {
            throw new Error("Usuario no encontrado")
        }
        if (!compareSync(value, user.password)) {
            throw new Error("la contraseña no coincide")
        }
        return true
    }),
];


module.exports = login