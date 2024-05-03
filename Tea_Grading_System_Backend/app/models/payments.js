'use strict';
module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define('payments', {
    reference_number: DataTypes.STRING,
    date: DataTypes.DATE,
    payment_type: DataTypes.ENUM('Cash', 'Card', 'Cheque'),
    amount: DataTypes.DECIMAL(10,2),
    paymentable_id: DataTypes.INTEGER,
    paymentable_type: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'payments',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  payments.associate = function (models) {
    // associations can be defined here
  };
  
  return payments;
};