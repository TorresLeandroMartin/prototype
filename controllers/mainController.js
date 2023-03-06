const fs = require("fs");
const path = require("path");

let productsJson = fs.readFileSync(
  path.join(__dirname, "../database/products.json")
);

let products = JSON.parse(productsJson);

const mainController = {

    index: (req, res) => {
        res.render("productsindex", { products });

    }
};

module.exports = mainController;