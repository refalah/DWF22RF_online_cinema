'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'})
    }
  };
  Film.init({
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    link: DataTypes.STRING,
    movie: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};