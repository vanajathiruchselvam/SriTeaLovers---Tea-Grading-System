'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rooms',
      [
        {
          reference_number: 'R001',
          name: 'Room#001',
          phone: '+94778945325',
          is_smoking: false,
          remarks: 'remarks',
          hotel_id: 1,
          floor_id: 1,
          room_type_id: 1,
          price:3000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          reference_number: 'R002',
          name: 'Room#002',
          phone: '+94778945325',
          is_smoking: true,
          remarks: 'remarks',
          hotel_id: 1,
          floor_id: 2,
          room_type_id: 2,
          price:3000,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
