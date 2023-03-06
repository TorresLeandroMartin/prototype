function authMiddleware(req, res, next) {
    if (!req.session.userLogged) {
      return res.redirect("/users/login");
    }
    next();
  }
// Second try
  // Hola
  
  module.exports = authMiddleware;