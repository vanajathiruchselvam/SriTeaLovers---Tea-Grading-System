'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reference_number: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      paid_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: '0.00'
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Completed', 'Cancelled', 'PartiallyPaid'),
        defaultValue: 'Pending'
      },
      payment_method: {
        type: Sequelize.ENUM('Cash', 'Cheque', 'Credit Card'),
        defaultValue: 'Cash'
      },
      hotel_id: {
        type: Sequelize.INTEGER,
        references: { model: 'hotels', key: 'id' },
        onDelete: 'CASCADE',
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
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
    await queryInterface.dropTable('reservations');
  },
};
