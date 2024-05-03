
'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleItems = sequelize.define('SaleItems', {
    quantity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10,2),
    items_id: DataTypes.INTEGER,
    sale_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SaleItems',
    tableName: 'sale_items',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  SaleItems.associate = function (models) {
    SaleItems.belongsTo(models.Sale, {foreignKey: 'sale_id', onDelete:'CASCADE', as:'sale'})
    SaleItems.belongsTo(models.Item, {foreignKey: 'items_id', onDelete:'CASCADE', as:'item'})
  };
  
  return SaleItems;
};