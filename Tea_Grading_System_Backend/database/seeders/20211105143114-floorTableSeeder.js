'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('floors',
      [
        {
          name: 'Floors#001',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Floors#002',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('floors', null, {});
  }
};
