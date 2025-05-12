import db from '../config/Database.js';
const { Accommodation, City } = db.models;

export const searchAccommodations = async (req, res) => {
  const { FromCity, ToCity, FromDate, ToDate, NumberOfTravelers } = req.query;

  try {
    // Step 1: Find CityID from City name
    const city = await City.findOne({
      where: { CityName: ToCity }
    });

    if (!city) {
      return res.status(404).json({ message: 'Destination city not found' });
    }

    // Step 2: Use CityID in Accommodation search
    const accommodations = await Accommodation.findAll({
      where: {
        CityID: city.CityID,
        // AvailableFrom: { [db.Sequelize.Op.lte]: FromDate },
        // AvailableTo: { [db.Sequelize.Op.gte]: ToDate },
        // MaxCapacity: { [db.Sequelize.Op.gte]: Number(NumberOfTravelers) }
      }
    });

    return res.status(200).json(accommodations);
  } catch (error) {
    console.error('[Accommodation Search Error]', error);
    return res.status(500).json({ message: 'Failed to fetch accommodation data.' });
  }
};