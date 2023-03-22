var express = require("express");
var router = express.Router();

const productController = require("../controllers/productController");

// Middlewares

const uploadFile = require("../middlewares/multerMiddlewareForProducts")

// // URL /products/
// router.get("/", productController.products);

// // URL /products/descriptionpage/numerodeidproducto
// router.get("/description/:id", productController.details);

// // URL / products/cart
// router.get("/cart/:id", productController.cart);

// // URL /products/create
// router.get("/create", productController.create);

// // URL /products/create
// router.post("/create", uploadFile.single('file'),productController.createAction);

// // URL /products/edit/:id
// router.get("/edit/:id", productController.edit);

// // URL /products/edit/:id
// router.put("/edit/:id", productController.editAction);

// // URL /products/edit/:id
// router.delete("/edit/:id", productController.deleteAction);

module.exports = router;
