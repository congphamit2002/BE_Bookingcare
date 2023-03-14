'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'thanhcongpham22072002@gmail.com',
      password: 'congpro123',
      firstName: 'Cong',
      lastName: 'Pham',
      address: 'Quang Nam',
      gender: 1,
      roleId: 'R1',
      phoneNumber: '0382412729',
      positionId: 'P1',
      image: 'cong.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
