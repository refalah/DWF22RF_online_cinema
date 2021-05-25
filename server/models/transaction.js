'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Film}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'})
      this.belongsTo(Film, {foreignKey: 'filmId'})
    }
  };
  transaction.init({
    accNumber: DataTypes.INTEGER,
    status: DataTypes.STRING,
    proofAttachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};