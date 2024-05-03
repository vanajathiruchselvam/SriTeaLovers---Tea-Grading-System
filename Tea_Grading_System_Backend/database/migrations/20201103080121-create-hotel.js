'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reference_number: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      street_address  : {
        type: Sequelize.STRING,
      },
      city : {
        type: Sequelize.STRING,
      },
      country : {
        type: Sequelize.STRING,
      },
      zip_code  : {
        type: Sequelize.STRING,
      },
      hotel_id: {
        type: Sequelize.INTEGER,
        references: { model: 'hotels', key: 'id' },
        onDelete: 'CASCADE',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hotels');
  },
};
