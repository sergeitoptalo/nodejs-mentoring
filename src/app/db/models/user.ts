import { DataTypes as IDataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: IDataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
