'use strict';
module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define('Designation', {
    name: DataTypes.STRING,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Designation',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Designation.associate = function (models) {
    // associations can be defined here
  };
  
  return Designation;
};