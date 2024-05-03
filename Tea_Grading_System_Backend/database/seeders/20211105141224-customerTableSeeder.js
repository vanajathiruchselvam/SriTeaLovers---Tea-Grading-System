'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('customers',
      [
        {
          full_name: 'Customer#001',
          nic_number: '235697825V',
          phone: '94771234656',
          email: 'Customer#001@example.com',
          address: 'Jaffna',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          full_name: 'Customer#001',
          nic_number: '235697825V',
          phone: '94771234656',
          email: 'Customer#001@example.com',
          address: 'Jaffna',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  },
};
