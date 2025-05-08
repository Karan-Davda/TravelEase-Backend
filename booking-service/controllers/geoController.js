import db from '../config/Database.js'

const { City, Accommodation, Experience, Transportation, TransportationType } = db.models

export const searchCityData = async (req, res) => {
  const { searchedCityName, userCity } = req.query;

  try {
    const [toCity, fromCity] = await Promise.all([
      City.findOne({ where: { CityName: searchedCityName } }),
      City.findOne({ where: { CityName: userCity } }),
    ]);

    if (!toCity) return res.status(404).json({ message: 'Destination city not found' });

    const toCityId = toCity.CityID;
    const fromCityId = fromCity?.CityID;

    const [experiences, accommodations] = await Promise.all([
      Experience.findAll({ where: { CityID: toCityId }, limit: 4 }),
      Accommodation.findAll({ where: { CityID: toCityId }, limit: 3 }),
    ]);

    let transportation = {};
    if (fromCity && userCity !== searchedCityName) {
      const transportData = await Transportation.findAll({
        where: {
          FromCityID: fromCityId,
          ToCityID: toCityId
        },
        include: [{
          model: TransportationType,
          as: 'Type',
          attributes: ['TransportationType']
        }]
      });

      // Group by name like Flight, Train, Bus
      for (const t of transportData) {
        const typeName = t.Type?.TransportationType || 'Unknown';
        if (!transportation[typeName]) transportation[typeName] = [];
        if (transportation[typeName].length < 3) {
          transportation[typeName].push({
            ...t.toJSON(),
            FromCityName: fromCity.CityName,
            ToCityName: toCity.CityName,
            TransportationType: typeName
          });
        }
      }
    }

    return res.json({
      city: toCity,
      experiences,
      accommodations,
      packages: [],
      ...transportation
    });

  } catch (err) {
    console.error('[searchCityData] Failed:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const suggestCities = async (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 3) {
    return res.status(400).json({ message: 'Query must be at least 3 characters.' });
  }

  try {
    const cities = await db.models.City.findAll({
      where: {
        CityName: {
          [db.Sequelize.Op.iLike]: `%${q}%` // case-insensitive match
        }
      },
      attributes: ['CityName'],
      limit: 10
    });

    res.json(cities);
  } catch (err) {
    console.error('[searchCitySuggestions] Failed:', err);
    res.status(500).json({ message: 'Failed to fetch city suggestions' });
  }
};