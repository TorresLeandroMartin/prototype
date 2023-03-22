const { Product } = require( './Product')
const { User } = require( './User')

module.exports = function (sequelize, dataTypes) {
    let alias = "Orders";
  
    let cols = {
      id_order: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_product: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      id_user: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: dataTypes.STRING,
      price: dataTypes,INTEGER,
    };
  
    let config = {
      tableName: "orders",
      timestamps: true,
      underscore: true
    };
  
    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
      Order.belongsTo(models.User, {
        as: "user",
        foreignKey: "id_order"
      })

      Order.belongsToMany(models.Product, {
        as: "products",
        foreignKey: "id_order",
        otherKey: "id_product",
        through: "orders_products"
      })
    }

    return Order
  };