'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.allcodes, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      users.belongsTo(models.allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      users.hasOne(models.markdowns, { foreignKey: 'doctorId' })
      users.hasOne(models.doctor_infors, { foreignKey: 'doctorId' })
      users.hasMany(models.schedule, { foreignKey: 'doctorId', as: 'doctorData' })
    }
  }
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB('long')

  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};