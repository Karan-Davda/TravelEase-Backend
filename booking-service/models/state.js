import { DataTypes } from 'sequelize';
const State = (sequelize) => {
  return sequelize.define('State', {
    StateID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    StateName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    StateCode: {
      type: DataTypes.STRING(5),
      allowNull: true // or false if you want it to be mandatory
    },
    CountryID: {
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
    tableName: 'State',
    timestamps: false

  });
}
export default State;