'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', {
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
      phone: {
        type: Sequelize.STRING,
      },
      is_smoking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      remarks: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      hotel_id: {
        type: Sequelize.INTEGER,
        references: { model: 'hotels', key: 'id' },
        onDelete: 'CASCADE',
      },
      floor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'floors', key: 'id' },
        onDelete: 'CASCADE',
      },
      room_type_id: {
        type: Sequelize.INTEGER,
        references: { model: 'room_types', key: 'id' },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('rooms');
  },
};
