import { DataTypes } from 'sequelize';

const Payments = (sequelize) => {
  return sequelize.define('Payments', {
    PaymentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TransactionID: { type: DataTypes.STRING(200), allowNull: false },
    Amount: { type: DataTypes.FLOAT, allowNull: false },
    Status: { type: DataTypes.STRING(50), allowNull: false },
    PaymentTypeID: { type: DataTypes.INTEGER, allowNull: false },
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Payments',
    timestamps: false
  });
};

export default Payments;