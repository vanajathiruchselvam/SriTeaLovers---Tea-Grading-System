'use strict';
module.exports = (sequelize, DataTypes) => {
  const Floor = sequelize.define('Floor', {
    name: DataTypes.STRING,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Floor',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Floor.associate = function (models) {
    // associations can be defined here
  };
  
  return Floor;
};