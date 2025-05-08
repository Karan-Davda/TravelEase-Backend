import { DataTypes } from 'sequelize';
const AccommodationType = (sequelize) => {
  return sequelize.define('AccommodationType', {
    AccommodationTypeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    AccommodationType: { type: DataTypes.STRING(50), allowNull: false },
    Status: { type: DataTypes.BOOLEAN, allowNull: false },
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'AccommodationType',
    timestamps: false
  });
};
export default AccommodationType;