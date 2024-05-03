
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    reference_number: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    is_smoking: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    remarks: DataTypes.STRING,
    floor_id: DataTypes.INTEGER,
    hotel_id : DataTypes.INTEGER,
    room_type_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Room',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Room.associate = function (models) {
    Room.belongsTo(models.Hotel, {foreignKey: 'hotel_id', onDelete:'CASCADE', as:'hotel'})
    Room.belongsTo(models.Floor, {foreignKey: 'floor_id', onDelete:'CASCADE', as:'floor'})
    Room.belongsTo(models.RoomType, {foreignKey: 'room_type_id', onDelete:'CASCADE', as:'roomType'})
  };
  require('../hooks/room')(Room);
  return Room;
};