'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define('RoomType', {
    name: DataTypes.STRING,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'RoomType',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  RoomType.associate = function (models) {
    // associations can be defined here
  };
  
  return RoomType;
};