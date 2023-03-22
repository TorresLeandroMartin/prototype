const { Product } = require('./Product')
const { Order } = require('./Order')

module.exports = function (sequelize, dataTypes) {
  let alias = "Users";

  let cols = {
    id_user: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function(models) {
    User.hasMany(models.Order, {
      as: 'orders',
      foreignKey: "id_user"
    })

    User.hasMany(models.Product, {
      as: "products",
      foreignKey: "id_user",
    })
}

  return User
};
