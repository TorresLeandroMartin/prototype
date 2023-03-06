const fs = require("fs");
const path = require("path");

let productsJson = fs.readFileSync(
  path.join(__dirname, "../database/products.json")
);

let products = JSON.parse(productsJson);

const productController = {
  products: (req, res) => {
    res.render("products", { products });
  },
  details: (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id == id);
    console.log(product);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.render("description", { product });
  },
  cart: (req, res) => {
    res.render("cart");
  },
  create: (req, res) => {
    res.render("create");
  },
  createAction: (req, res, next) => {

    if (req.file) {
      let newProduct = req.body;
      newProduct.image = req.file.originalname;

      const highestId = products.reduce(
        (maxId, product) => Math.max(maxId, product.id),
        0
      );
      newProduct.id = highestId + 1;
      products.push(newProduct);

      const newProductJson = JSON.stringify(products, null, 2);
      fs.writeFileSync(
        path.join(__dirname, "../database/products.json"),
        newProductJson,
        "utf-8"
      );

      res.redirect("/");
    } else {
      const file = req.file;

      if (!file) {
        const error = new Error("Por favor seleccione un archivo");
        error.httpSatusCode = 400;
        return next(error);
      }
    }
  },
  edit: (req, res) => {
    const productFound = products.find(
      (product) => product.id == req.params.id
    );

    // Si productFound = false devuelvo mensaje de error
    if (!productFound)
      return res.status(404).json({
        message: "Product not found",
      });

    let idProduct = req.params.id;

    let productToEdit = products.find((product) => product.id == idProduct);

    res.render("edit", { products: productToEdit });
  },
  editAction: (req, res) => {
    let idProduct = req.params.id;

    let updatesToProduct = {};

    if (req.body.name) updatesToProduct.name = req.body.name;
    if (req.body.id) updatesToProduct.id = req.body.id;
    if (req.body.price) updatesToProduct.price = req.body.price;
    if (req.body.size) updatesToProduct.size = req.body.size;
    if (req.body.color) updatesToProduct.color = req.body.color;
    if (req.body.color) updatesToProduct.description = req.body.description;

    let targetProductIndex = products.findIndex(
      (product) => product.id === parseInt(idProduct)
    );

    if (targetProductIndex === -1) {
      return res.status(404).json({
        error: `Product with id ${idProduct} not found`,
      });
    }

    let newProducts = [
      ...products.slice(0, targetProductIndex),
      { ...products[targetProductIndex], ...updatesToProduct },
      ...products.slice(targetProductIndex + 1),
    ];

    const newProductJson = JSON.stringify(newProducts);

    fs.writeFileSync(
      path.join(__dirname, "../database/products.json"),
      newProductJson
    );

    res.redirect("/products");
  },
  deleteAction: (req, res) => {
    let newProducts = products.filter((p) => p.id !== req.params.id);

    fs.writeFile(
      path.join(__dirname, "../database/products.json"),
      JSON.stringify(newProducts),
      (err) => {
        if (err) {
          return res.status(500).json({
            error: "An error occurred while updating the products list",
          });
        }

        res.redirect("/");
      }
    );
  },
};

module.exports = productController;
