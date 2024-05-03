'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    reason: DataTypes.STRING,
    status: DataTypes.ENUM('Applied', 'Approved', 'Rejected', 'Cancelled'),
    staff_id: DataTypes.INTEGER,
    approver_id: DataTypes.INTEGER,
   
    
  }, {
    sequelize,
    modelName: 'Leave',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Leave.associate = function (models) {
    Leave.belongsTo(models.staff, {foreignKey: 'staff_id', onDelete:'CASCADE', as:'staff'})
    Leave.belongsTo(models.User, {foreignKey: 'approver_id', onDelete:'CASCADE', as:'approver'})
  };
  
  return Leave;
};