import { DataTypes } from 'sequelize';

const Country = (sequelize) => {
  return sequelize.define('Country', {
    CountryID: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    CountryName: { 
      type: DataTypes.STRING(30), 
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
    tableName: 'Country', 
    timestamps: false 
  });
}

export default Country;