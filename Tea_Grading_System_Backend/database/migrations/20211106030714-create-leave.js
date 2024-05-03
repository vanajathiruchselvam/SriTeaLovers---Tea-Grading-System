'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leaves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      from_date: {
        type: Sequelize.DATE,
      },
      to_date: {
        type: Sequelize.DATE,
      },
      reason: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('Applied', 'Approved', 'Rejected', 'Cancelled'),
        defaultValue: 'Applied',
      },
      staff_id: {
        type: Sequelize.INTEGER,
        references: { model: 'staffs', key: 'id' },
        onDelete: 'CASCADE',
      },
      approver_id: {
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
    await queryInterface.dropTable('leaves');
  },
};
