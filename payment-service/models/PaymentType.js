import { DataTypes } from 'sequelize';

const PaymentType = (sequelize) => {
  return sequelize.define('PaymentType', {
    PaymentTypeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    PaymentType: { type: DataTypes.STRING(50), allowNull: false },
    Status: { type: DataTypes.BOOLEAN, allowNull: false },
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'PaymentType',
    timestamps: false
  });
};

export default PaymentType;