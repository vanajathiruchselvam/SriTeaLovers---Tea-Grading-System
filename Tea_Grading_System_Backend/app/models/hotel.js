'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    reference_number: DataTypes.STRING,
    name: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Hotel',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Hotel.associate = function (models) {
    // associations can be defined here
  };
  require('../hooks/hotel')(Hotel);
  return Hotel;
};