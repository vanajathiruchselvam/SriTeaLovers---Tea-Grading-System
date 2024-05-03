'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      reference_number: {
        type: Sequelize.STRING,
      },
      paid_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Customers', key: 'id' },
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Completed', 'Cancelled', 'PartiallyPaid'),
        defaultValue: 'Pending'
      },
      payment_method: {
        type: Sequelize.ENUM('Cash', 'Cheque', 'Credit Card'),
        defaultValue: 'Cash'
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
    await queryInterface.dropTable('sales');
  },
};
