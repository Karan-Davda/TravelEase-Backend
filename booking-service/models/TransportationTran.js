import { DataTypes } from 'sequelize';

const TransportationTran = (sequelize) => {
  return sequelize.define('Transportation_Tran', {
    TransportationTranID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TransportationID: { type: DataTypes.INTEGER, allowNull: false },
    SeatNumber: { type: DataTypes.STRING(10), allowNull: false },
    SeatType: { type: DataTypes.STRING(50), allowNull: false },
    Status: { type: DataTypes.STRING(50), allowNull: false }, // e.g., Available, Booked, Held
    Created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER }
  }, {
    tableName: 'Transportation_Tran',
    timestamps: false
  });
};

export default TransportationTran;