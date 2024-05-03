'use strict';
module.exports = (sequelize, DataTypes) => {
  const roomReservation = sequelize.define('roomReservation', {
    amount: DataTypes.DECIMAL(10,2),
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    adults: DataTypes.INTEGER,
    child: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    reservation_id : DataTypes.INTEGER,
  
  }, {
    sequelize,
    modelName: 'roomReservation',
    tableName: 'roomreservations',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  roomReservation.associate = function (models) {
    roomReservation.belongsTo(models.Room, {foreignKey: 'room_id', onDelete:'CASCADE', as:'room'})
    roomReservation.belongsTo(models.Reservation, {foreignKey: 'reservation_id', onDelete:'CASCADE', as:'reservation'})
  };
  
  return roomReservation;
};