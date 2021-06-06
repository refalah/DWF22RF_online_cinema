'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Film}) {
      this.belongsTo(User, {foreignKey: 'userId'})
      this.belongsTo(Film, {foreignKey: 'filmId'})
    }
  };
  Wishlist.init({
    exist: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};