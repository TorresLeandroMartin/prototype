var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

// Middlewares
const validationMiddleware = require("../middlewares/validationMiddleware");
const uploadFile = require('../middlewares/multerMiddleware');
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// URL /users
router.get("/", userController.index);

// URL /users/userdetails/numerodeidusuario
router.get("/userdetails/:id", userController.details);

// URL /users/register
router.get("/register", guestMiddleware, userController.register);

// URL /users/register
router.post("/register", uploadFile.single("file"), validationMiddleware, userController.registerAction);

// URL /users/login
router.get("/login", guestMiddleware, userController.login);

// URL /users/login - Las validaciones para este no las hizo en el video
router.post("/login", userController.loginProcess);

router.get("/logout", userController.logOut);

router.get("/profile", authMiddleware, userController.profile);

module.exports = router;
