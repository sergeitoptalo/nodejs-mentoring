import { DataTypes as IDataTypes, Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: IDataTypes) => {
  const Product = sequelize.define('Product', {
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    reviews: DataTypes.DECIMAL(10, 2),
    title: DataTypes.STRING,
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
  };
  return Product;
};
