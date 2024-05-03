'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      purchasing_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      selling_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      available_stock: {
        type: Sequelize.INTEGER,
      },
      damage: {
        type: Sequelize.INTEGER,
      },
      reorder_level: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('items');
  },
};
