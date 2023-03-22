const { Order } = require("./Order");
const { User } = require("./User");

module.exports = function (sequelize, dataTypes) {
  let alias = "Products";

  let cols = {
    id_product: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "products",
    timestamps: true,
    underscore: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      as: "user",
      foreignKey: "id_product"
    });

    Product.belongsToMany(models.Order, {
      as: "orders",
      foreignKey: "id_product",
      otherKey: "id_order",
      through: "orders_products"
    })

  };

  return Product;
};

