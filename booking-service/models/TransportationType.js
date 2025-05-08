import { DataTypes } from 'sequelize';
const TransportationType = (sequelize) => {
  return sequelize.define('TransportationType', {
    TransportationTypeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TransportationType: { type: DataTypes.STRING(50), allowNull: false },
    Status: { type: DataTypes.BOOLEAN, allowNull: false },
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'TransportationType',
    timestamps: false
  });
};
export default TransportationType;
