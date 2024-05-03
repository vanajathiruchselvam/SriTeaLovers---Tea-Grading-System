'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      staff_no: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        defaultValue: 'Male',
      },
      date_of_birth: {
        type: Sequelize.DATE,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.DECIMAL(10, 2),
      },
      monthly_overtime: {
        type: Sequelize.DECIMAL(10, 2),
      },
      overtime_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      travelling_allowance: {
        type: Sequelize.DECIMAL(10, 2),
      },
      designation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'designations', key: 'id' },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('staffs');
  },
};
