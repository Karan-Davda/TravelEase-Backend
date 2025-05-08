import { DataTypes } from 'sequelize';
const Experiences = (sequelize) => {
  return sequelize.define('Experiences', {
    ExperienceID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ExperienceName: { type: DataTypes.STRING(100), allowNull: false },
    IsTicket: { type: DataTypes.BOOLEAN, allowNull: false },
    Amount: { type: DataTypes.FLOAT, allowNull: false },
    CityID: { type: DataTypes.INTEGER, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: true },
    PhotoURL: { type: DataTypes.STRING, allowNull: true },
    Status: { type: DataTypes.BOOLEAN, allowNull: false },
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'Experiences',
    timestamps: false
  });
};
export default Experiences;