'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roomreservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      adults: {
        type: Sequelize.INTEGER,
      },
      child: {
        type: Sequelize.INTEGER,
      },
      check_in: {
        type: Sequelize.DATE,
      },
      check_out: {
        type: Sequelize.DATE,
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: { model: 'rooms', key: 'id' },
        onDelete: 'CASCADE',
      },
      reservation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'reservations', key: 'id' },
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
    await queryInterface.dropTable('roomreservations');
  },
};
