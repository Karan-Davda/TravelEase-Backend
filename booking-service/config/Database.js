// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Model imports
import createCountryModel from '../models/Country.js';
import createStateModel from '../models/State.js';
import createCityModel from '../models/City.js';
import createCountyModel from '../models/County.js';

import createExperiencesModel from '../models/experiences.js';
import createTransportationModel from '../models/Transportation.js';
import createTransportationTypeModel from '../models/TransportationType.js';
import createTransportationTranModel from '../models/TransportationTran.js';
import createAccommodationModel from '../models/Accommodation.js';
import createAccommodationTypeModel from '../models/AccommodationType.js';
import createAccommodationTranModel from '../models/AccommodationTran.js';

import createBookingsModel from '../models/Bookings.js';
import createBookingsTranModel from '../models/Bookings_Tran.js';

// Setup Sequelize instance
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,
});

// Initialize models
const Country = createCountryModel(sequelize);
const State = createStateModel(sequelize);
const City = createCityModel(sequelize);
const County = createCountyModel(sequelize);

const Experience = createExperiencesModel(sequelize);
const Transportation = createTransportationModel(sequelize);
const TransportationType = createTransportationTypeModel(sequelize);
const TransportationTran = createTransportationTranModel(sequelize);
const Accommodation = createAccommodationModel(sequelize);
const AccommodationType = createAccommodationTypeModel(sequelize);
const AccommodationTran = createAccommodationTranModel(sequelize);

const Bookings = createBookingsModel(sequelize);
const BookingsTran = createBookingsTranModel(sequelize);

// Define associations
State.belongsTo(Country, { foreignKey: 'CountryID' });
Country.hasMany(State, { foreignKey: 'CountryID' });

City.belongsTo(State, { foreignKey: 'StateID' });
State.hasMany(City, { foreignKey: 'StateID' });

County.belongsTo(City, { foreignKey: 'CityID' });
City.hasMany(County, { foreignKey: 'CityID' });

City.hasMany(Experience, { foreignKey: 'CityID' });
Experience.belongsTo(City, { foreignKey: 'CityID' });

City.hasMany(Accommodation, { foreignKey: 'CityID' });
Accommodation.belongsTo(City, { foreignKey: 'CityID' });

AccommodationType.hasMany(Accommodation, { foreignKey: 'AccommodationTypeID' });
Accommodation.belongsTo(AccommodationType, { foreignKey: 'AccommodationTypeID' });

City.hasMany(Transportation, { foreignKey: 'ToCityID' });
City.hasMany(Transportation, { foreignKey: 'FromCityID' });

Transportation.belongsTo(City, { foreignKey: 'ToCityID', as: 'DestinationCity' });
Transportation.belongsTo(City, { foreignKey: 'FromCityID', as: 'OriginCity' });

TransportationType.hasMany(Transportation, { foreignKey: 'TransportationTypeID' });
Transportation.belongsTo(TransportationType, {
  foreignKey: 'TransportationTypeID',
  as: 'Type'
});


Bookings.hasMany(BookingsTran, { foreignKey: 'BookingID' });
BookingsTran.belongsTo(Bookings, { foreignKey: 'BookingID' });

TransportationTran.hasMany(BookingsTran, { foreignKey: 'TransportationTranID' });
BookingsTran.belongsTo(TransportationTran, { foreignKey: 'TransportationTranID' });

AccommodationTran.hasMany(BookingsTran, { foreignKey: 'AccommodationTranID' });
BookingsTran.belongsTo(AccommodationTran, { foreignKey: 'AccommodationTranID' });

City.hasMany(BookingsTran, { foreignKey: 'FromCityID', as: 'BookingFromCity' });
City.hasMany(BookingsTran, { foreignKey: 'ToCityID', as: 'BookingToCity' });
BookingsTran.belongsTo(City, { foreignKey: 'FromCityID', as: 'BookingFromCity' });
BookingsTran.belongsTo(City, { foreignKey: 'ToCityID', as: 'BookingToCity' });

// Build db object
const db = {
  sequelize,
  Sequelize,
  models: {
    Country,
    State,
    City,
    County,
    Experience,
    Transportation,
    TransportationType,
    TransportationTran,
    Accommodation,
    AccommodationType,
    Bookings,
    BookingsTran
  }
};

export default db;