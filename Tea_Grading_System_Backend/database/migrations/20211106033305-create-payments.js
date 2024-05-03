'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
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
      payment_type: {
        type: Sequelize.ENUM('Cash', 'Card', 'Cheque'),
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      paymentable_id: {
        type: Sequelize.INTEGER,
      },
      paymentable_type: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('payments');
  },
};
