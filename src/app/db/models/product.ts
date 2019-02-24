import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    reviews: DataTypes.DECIMAL(10, 2)
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};
