'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class allcodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            allcodes.hasMany(models.users, { foreignKey: 'positionId', as: 'positionData' })
            allcodes.hasMany(models.users, { foreignKey: 'gender', as: 'genderData' })
            allcodes.hasMany(models.schedule, { foreignKey: 'timeType', as: 'timeTypeData' })
            allcodes.hasMany(models.doctor_infors, { foreignKey: 'priceId', as: 'priceData' })
            allcodes.hasMany(models.doctor_infors, { foreignKey: 'provinceId', as: 'provinceData' })
            allcodes.hasMany(models.doctor_infors, { foreignKey: 'paymentId', as: 'paymentData' })

        }
    }
    allcodes.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'allcodes',
    });
    return allcodes;
};