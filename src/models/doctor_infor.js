'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class doctor_infors extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            doctor_infors.belongsTo(models.allcodes, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' })

            doctor_infors.belongsTo(models.allcodes, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' })

            doctor_infors.belongsTo(models.allcodes, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' })

            doctor_infors.belongsTo(models.users, { foreignKey: 'doctorId' })

        }
    }
    doctor_infors.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        clinicAddress: DataTypes.STRING,
        clinicName: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'doctor_infors',
    });
    return doctor_infors;
};