import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import creatPackageModel from '../models/Package.js';
import createPackageTranModel from '../models/PackageTran.js';
import createPackageTranWiseExperienceModel from '../models/PackageTranWiseExperience.js';
import createTransportModel from '../../booking-service/models/Transportation.js'
import createCityModel from '../../booking-service/models/city.js'
import createExperiencesModel from '../../booking-service/models/experiences.js'
import createAccommodationModel from '../../booking-service/models/Accommodation.js'


// Setup Sequelize instance
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false
});

const Package = creatPackageModel(sequelize);
const PackageTran = createPackageTranModel(sequelize);
const PackageTranWiseExperience = createPackageTranWiseExperienceModel(sequelize);
const Transportation = createTransportModel(sequelize);
const City = createCityModel(sequelize);
const Experiences = createExperiencesModel(sequelize);
const Accommodation = createAccommodationModel(sequelize);

Package.hasMany(PackageTran, { foreignKey: 'PackageID' });
PackageTran.belongsTo(Package, { foreignKey: 'PackageID' });

PackageTran.belongsTo(Transportation, { foreignKey: 'TransportationID', as: 'Transportation' });
PackageTran.belongsTo(Accommodation, { foreignKey: 'AccommodationID', as: 'Accommodation' });


PackageTran.belongsTo(City, { foreignKey: 'FromCityID', as: 'FromCity' });
PackageTran.belongsTo(City, { foreignKey: 'ToCityID', as: 'ToCity' });

// Source and Destination cities for Package
Package.belongsTo(City, { foreignKey: 'SourceCityID', as: 'SourceCity' });
Package.belongsTo(City, {
    foreignKey: 'DestinationCityID', as: 'DestinationCity'
});

// PackageTran ↔ Experiences (Many-to-Many through PackageTranWiseExperience)
PackageTran.belongsToMany(Experiences, {
    through: PackageTranWiseExperience, foreignKey: 'PackageTranID', otherKey: 'ExperienceID', as: 'Experiences'
});

Experiences.belongsToMany(PackageTran, {
    through: PackageTranWiseExperience, foreignKey: 'ExperienceID', otherKey: 'PackageTranID', as: 'PackageTrans'
});

const db = {
    sequelize,
    Sequelize,
    models: {
        Package,
        PackageTran,
        PackageTranWiseExperience,
        City,
        Transportation,
        Experiences,
        Accommodation
    }
};

export default db;