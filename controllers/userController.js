const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

// Model
const User = require("../database/models/User");

const userController = {
  index: (req, res) => {
    res.render("users", { users });
  },
  details: (req, res) => {
    res.render("userdetails");
  },
  register: (req, res) => {
    res.render("register");
  },
  registerAction: (req, res, next) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = User.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("register", {
        errors: {
          email: {
            msg: "Este email ya esta registrado",
          },
        },
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      image: req.file.filename,
    };

    let userCreated = User.create(userToCreate);
    return res.redirect("/users/profile");
  },
  login: (req, res) => {
    res.render("login");
  },
  loginProcess: (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      let isOkThePassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
        }

        return res.redirect("/users/profile");
      }
      return res.render("login", {
        errors: {
          msg: "Las credenciales son invalidas",
        },
      });
    }
    return res.render("login", {
      errors: {
        msg: "No se encuentra el email",
      },
    });
  },
  profile: (req, res) => {
    res.render("profile", {
      user: req.session.userLogged,
    });
  },
  logOut: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = userController;
