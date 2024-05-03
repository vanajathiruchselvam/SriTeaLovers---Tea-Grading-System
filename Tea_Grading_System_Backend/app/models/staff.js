

'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff = sequelize.define('staff', {
    staff_no: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.ENUM('Male', 'Female'),
    date_of_birth: DataTypes.DATE,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    salary: DataTypes.DECIMAL(10, 2),
    monthly_overtime: DataTypes.DECIMAL(10, 2),
    overtime_amount: DataTypes.DECIMAL(10, 2),
    travelling_allowance: DataTypes.DECIMAL(10, 2),
    designation_id: DataTypes.INTEGER,
    hotel_id: DataTypes.INTEGER,
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'staff',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  staff.associate = function (models) {
    staff.belongsTo(models.Designation, {foreignKey: 'designation_id', onDelete:'CASCADE', as:'designation'})
    staff.belongsTo(models.Hotel, {foreignKey: 'hotel_id', onDelete:'CASCADE', as:'hotel'})
  };
  require('../hooks/staff')(staff);
  return staff;
};