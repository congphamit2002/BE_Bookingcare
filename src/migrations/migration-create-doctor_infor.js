'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('doctor_infors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            priceId: {
                type: Sequelize.STRING
            },
            provinceId: {
                type: Sequelize.STRING
            },
            paymentId: {
                type: Sequelize.STRING
            },
            clinicAddress: {
                type: Sequelize.STRING
            },
            clinicName: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('doctor_infors');
    }
};