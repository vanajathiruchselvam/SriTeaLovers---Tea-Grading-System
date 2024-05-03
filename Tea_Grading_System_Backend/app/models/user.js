'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    password: DataTypes.STRING,
    hotel_id: DataTypes.INTEGER,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  User.associate = function (models) {
    User.belongsTo(models.Hotel, {foreignKey: 'hotel_id', onDelete:'CASCADE', as :'hotel' })
  };
  
  return User;
};