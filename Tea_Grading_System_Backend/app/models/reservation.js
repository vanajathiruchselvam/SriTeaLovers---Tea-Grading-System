
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    date: DataTypes.DATE,
    reference_number: DataTypes.STRING,
    paid_amount: DataTypes.DECIMAL(10, 2),
    total_amount: DataTypes.DECIMAL(10, 2),
    status: DataTypes.ENUM('Pending', 'Completed', 'Cancelled', 'PartiallyPaid'),
    payment_method: DataTypes.ENUM('Cash', 'Cheque', 'Credit Card'),
    hotel_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Reservation.associate = function (models) {
    Reservation.belongsTo(models.Hotel, {foreignKey: 'hotel_id', onDelete:'CASCADE', as:'hotel'})
    Reservation.belongsTo(models.Customer, {foreignKey: 'customer_id', onDelete:'CASCADE', as:'customer'})
    Reservation.belongsTo(models.User, {foreignKey: 'user_id', onDelete:'CASCADE', as:'user'})
    Reservation.hasMany(models.roomReservation, { foreignKey: 'reservation_id', as: 'roomReservation' })
  };
  require('../hooks/booking')(Reservation);
  return Reservation;
};