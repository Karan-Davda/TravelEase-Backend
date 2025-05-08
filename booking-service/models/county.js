import { DataTypes } from 'sequelize';
const County = (sequelize) => {
  return sequelize.define('County', {
    CountyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CountyName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    CityID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    Modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'County',
    timestamps: false
  });
}
export default County;