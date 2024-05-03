'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    date: DataTypes.DATE,
    reference_number: DataTypes.STRING,
    paid_amount: DataTypes.DECIMAL(10,2),
    total_amount: DataTypes.DECIMAL(10,2),
    customer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('Pending', 'Completed', 'Cancelled', 'PartiallyPaid'),
  }, {
    sequelize,
    modelName: 'Sale',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Sale.associate = function (models) {
    Sale.belongsTo(models.Customer, {foreignKey: 'customer_id', onDelete:'CASCADE', as:'customer'})
    Sale.belongsTo(models.User, {foreignKey: 'user_id', onDelete:'CASCADE', as:'user'})
    Sale.hasMany(models.SaleItems, { foreignKey: 'sale_id', as: 'saleItems' })
  };
  require('../hooks/sales')(Sale);
  return Sale;
};