import db from '../config/Database.js';
import { Op, fn, col, where } from 'sequelize';

const { Transportation, City, TransportationType, TransportationTran } = db.models;

export const fetchTransportByTypeName = async (req, res) => {
  const {
    fromCityName,
    toCityName,
    fromDate,
    toDate,
    minPrice,
    maxPrice,
    numberOfTravelers
  } = req.query;

  const transportTypeName = req.transportTypeName;

  try {
    const [fromCity, toCity, transportType] = await Promise.all([
      City.findOne({ where: { CityName: fromCityName } }),
      City.findOne({ where: { CityName: toCityName } }),
      TransportationType.findOne({ where: { TransportationType: transportTypeName } }),
    ]);

    if (!fromCity || !toCity || !transportType) {
      return res.status(400).json({
        message: 'Invalid fromCityName, toCityName, or transport type.'
      });
    }

    const commonFilters = (fromID, toID, exactDate) => {
      const filters = {
        FromCityID: fromID,
        ToCityID: toID,
        TransportationTypeID: transportType.TransportationTypeID
      };
    
      const conditions = [];
    
      if (exactDate) {
        conditions.push(where(fn('DATE', col('DepartureTime')), '=', exactDate));
      }

      if (minPrice || maxPrice) {
        const priceCondition = {};
        if (minPrice) priceCondition[Op.gte] = parseFloat(minPrice);
        if (maxPrice) priceCondition[Op.lte] = parseFloat(maxPrice);
        filters.Price = priceCondition;
      }
    
      if (numberOfTravelers) {
        filters.AvailableSeats = { [Op.gte]: parseInt(numberOfTravelers) };
      }
    
      if (conditions.length > 0) {
        filters[Op.and] = conditions;
      }
    
      return filters;
    };

    // Onward journey
    const onwardFilters = commonFilters(fromCity.CityID, toCity.CityID, fromDate);
    const onwardResults = await Transportation.findAll({
      where: onwardFilters,
      include: [
        { model: City, as: 'OriginCity', attributes: ['CityName'] },
        { model: City, as: 'DestinationCity', attributes: ['CityName'] },
        { model: TransportationType, as: 'Type', attributes: ['TransportationTypeID', 'TransportationType'] }
      ],
      order: [['DepartureTime', 'ASC']]
    });

    const onward = onwardResults.map(t => ({
      TransportationID: t.TransportationID,
      TransportationName: t.TransportationName,
      TransportationTypeID: t.Type?.TransportationTypeID,
      TransportationType: t.Type?.TransportationType,
      FromCityName: t.OriginCity?.CityName,
      ToCityName: t.DestinationCity?.CityName,
      DepartureTime: t.DepartureTime.toLocaleString('en-US', { timeZone: 'America/New_York' }),
      ArrivalTime: t.ArrivalTime.toLocaleString('en-US', { timeZone: 'America/New_York' }),          
      Duration: t.Duration,
      Price: t.Price,
      AvailableSeats: t.AvailableSeats
    }));

    // Return trip if toDate is given
    let returnTrip = [];
    if (toDate) {
      const returnFilters = commonFilters(toCity.CityID, fromCity.CityID, toDate);
      const returnResults = await Transportation.findAll({
        where: returnFilters,
        include: [
          { model: City, as: 'OriginCity', attributes: ['CityName'] },
          { model: City, as: 'DestinationCity', attributes: ['CityName'] }
        ],
        order: [['DepartureTime', 'ASC']]
      });

      returnTrip = returnResults.map(t => ({
        TransportationID: t.TransportationID,
        TransportationName: t.TransportationName,
        FromCityName: t.OriginCity?.CityName,
        ToCityName: t.DestinationCity?.CityName,
        DepartureTime: t.DepartureTime.toLocaleString('en-US', { timeZone: 'America/New_York' }),
        ArrivalTime: t.ArrivalTime.toLocaleString('en-US', { timeZone: 'America/New_York' }),                   
        Duration: t.Duration,
        Price: t.Price,
        AvailableSeats: t.AvailableSeats
      }));
    }

    return res.json({
      onward,
      ...(toDate && { return: returnTrip })
    });

  } catch (err) {
    console.error(`[${transportTypeName} fetch error]`, err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFlights = (req, res) => {
  req.transportTypeName = 'Flight';
  return fetchTransportByTypeName(req, res);
};

export const getTrains = (req, res) => {
  req.transportTypeName = 'Train';
  return fetchTransportByTypeName(req, res);
};

export const getBuses = (req, res) => {
  req.transportTypeName = 'Bus';
  return fetchTransportByTypeName(req, res);
};

export const getSeatMap = async (req, res) => {
  const { transportationId } = req.params;

  try {
    const transportation = await Transportation.findByPk(transportationId);
    if (!transportation) {
      return res.status(404).json({ message: 'Transportation not found' });
    }

    const type = await TransportationType.findByPk(transportation.TransportationTypeID);
    const typeName = type?.TransportationType || 'Unknown';

    const seats = await TransportationTran.findAll({
      where: { TransportationID: transportationId },
      attributes: ['SeatNumber', 'SeatType', 'Status'],
      raw: true
    });

    // Sorting logic based on type
    seats.sort((a, b) => {
      const seatA = a.SeatNumber;
      const seatB = b.SeatNumber;

      if (typeName === 'Flight') {
        const [rowA, colA] = seatA.match(/^(\d+)([A-Z])$/)?.slice(1) || [0, ''];
        const [rowB, colB] = seatB.match(/^(\d+)([A-Z])$/)?.slice(1) || [0, ''];
        return parseInt(rowA) - parseInt(rowB) || colA.localeCompare(colB);
      }

      if (typeName === 'Train') {
        const [charA, numA] = [seatA[0], parseInt(seatA.slice(1))];
        const [charB, numB] = [seatB[0], parseInt(seatB.slice(1))];
        return charA.localeCompare(charB) || numA - numB;
      }

      if (typeName === 'Bus') {
        return parseInt(seatA) - parseInt(seatB);
      }

      return seatA.localeCompare(seatB);
    });

    const totalSeats = seats.length;

    res.json({
      transportationId,
      totalSeats,
      seats
    });
  } catch (err) {
    console.error('[getSeatMap] Failed:', err);
    res.status(500).json({ message: 'Unable to fetch seat map' });
  }
};

export const getAllTransportationTypes = async (req, res) => {
  try {
    const types = await TransportationType.findAll({
      attributes: ['TransportationTypeID', 'TransportationType'],
      order: [['TransportationTypeID', 'ASC']],
    });

    res.status(200).json(types);
  } catch (error) {
    console.error('[Fetch Transportation Types Error]', error);
    res.status(500).json({ message: 'Failed to fetch transportation types.' });
  }
};