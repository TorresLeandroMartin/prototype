const path = require("path");

const { check } = require("express-validator");

const validationMiddleware = [
  check("firstname").notEmpty().withMessage("Debes completar este campo"),
  check("lastname").notEmpty().withMessage("Debes completar este campo"),
  check("email")
    .notEmpty()
    .withMessage("Debes completar este campo")
    .bail()
    .isEmail()
    .withMessage("Direccion de correo invalida"),
  check("password").notEmpty().withMessage("Debes completar este campo"),
  check("file").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      // en esta linea puede ser originalname o filename
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`Extension de archivo invalida.`);
      }
    }
    return true;
  }),
];

// CAMBIOS REALIZADOS EN TESTING

module.exports = validationMiddleware;
