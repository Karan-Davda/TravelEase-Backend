import { DataTypes } from 'sequelize';

const User = (sequelize) => {
  return sequelize.define('User', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Mobile: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    DateOfBirth: {
      type: DataTypes.DATE
    },
    Address: {
      type: DataTypes.STRING(200)
    },
    IsPartner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsTravelAgency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsTourGuide: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsSMS: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsWhatsapp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Modified: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ModifiedBy: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'User',
    timestamps: false
  });
};

export default User;