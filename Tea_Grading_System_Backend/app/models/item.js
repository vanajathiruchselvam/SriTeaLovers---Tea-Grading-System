
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    purchasing_price: DataTypes.DECIMAL(10,2),
    selling_price: DataTypes.DECIMAL(10,2),
    available_stock: DataTypes.INTEGER,
    damage: DataTypes.INTEGER,
    reorder_level: DataTypes.INTEGER,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Item',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Item.associate = function (models) {
    // associations can be defined here
  };
  require('../hooks/item')(Item);
  return Item;
};