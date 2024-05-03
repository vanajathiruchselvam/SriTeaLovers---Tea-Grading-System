'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('room_types',
      [
        {
          name: 'Quarters',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Budget',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'semi luxury',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Luxury',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('room_types', null, {});
  }
};
