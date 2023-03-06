var express = require("express");
var router = express.Router();

const productController = require("../controllers/productController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, "../public/images/products/");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    let imageName = "img-products" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const uploadFile = multer({ storage });

// URL /products/
router.get("/", productController.products);

// URL /products/descriptionpage/numerodeidproducto
router.get("/description/:id", productController.details);

// URL / products/cart
router.get("/cart/:id", productController.cart);

// URL /products/create
router.get("/create", productController.create);

// URL /products/create
router.post("/create", uploadFile.single('file'),productController.createAction);

// URL /products/edit/:id
router.get("/edit/:id", productController.edit);

// URL /products/edit/:id
router.put("/edit/:id", productController.editAction);

// URL /products/edit/:id
router.delete("/edit/:id", productController.deleteAction);

module.exports = router;
