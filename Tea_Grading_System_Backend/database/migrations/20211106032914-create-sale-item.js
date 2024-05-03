'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sale_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      items_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Items', key: 'id' },
        onDelete: 'CASCADE',
      },
      sale_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Sales', key: 'id' },
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
    await queryInterface.dropTable('sale_items');
  },
};
