'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('hotels',
    [
      {
        reference_number: 'Hotel#001',
        name: 'Hotel#001',
        street_address: 'KkS',
        city: 'Jaffna',
        country: 'Srilanka',
        zip_code: '4000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        reference_number: 'Hotel#002',
        name: 'Hotel#002',
        street_address: 'KkS',
        city: 'Jaffna',
        country: 'Srilanka',
        zip_code: '4000',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ],
    {}
  );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('hotels', null, {});
  }
};
