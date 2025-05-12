import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PackageTranWiseExperience = (sequelize) => {
    return sequelize.define('PackageTranWiseExperience', {
        PackageTranWiseExperienceID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        PackageTranID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ExperienceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        Modified: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        ModifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'PackageTranWiseExperience',
        timestamps: false
    });
};

export default PackageTranWiseExperience;