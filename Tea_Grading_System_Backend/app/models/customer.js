'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    full_name: DataTypes.STRING,
    nic_number: DataTypes.STRING,
    passport_number: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    company: DataTypes.STRING,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Customer.associate = function (models) {
    // associations can be defined here
  };
  
  return Customer;
};