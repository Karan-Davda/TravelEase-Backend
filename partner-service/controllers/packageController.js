import db from '../config/database.js';
const { Package, PackageTran, PackageTranWiseExperience, City, Transportation, Accommodation, Experiences } = db.models;
import { differenceInDays } from 'date-fns';

export const createNestedPackage = async (req, res) => {
  const { Package: packageDataRaw, PackageTran: tranList } = req.body;

  if (!packageDataRaw || !tranList || !Array.isArray(tranList)) {
    return res.status(400).json({ message: 'Invalid request structure.' });
  }

  const t = await db.sequelize.transaction();

  try {
    // 🌆 Resolve Package FromCityName and ToCityName
    const { FromCityName, ToCityName, ...packageData } = packageDataRaw;

    const sourceCity = await City.findOne({ where: { CityName: FromCityName }, transaction: t });
    if (!sourceCity) throw new Error(`Source city '${FromCityName}' not found.`);

    const destinationCity = await City.findOne({ where: { CityName: ToCityName }, transaction: t });
    if (!destinationCity) throw new Error(`Destination city '${ToCityName}' not found.`);

    packageData.SourceCityID = sourceCity.CityID;
    packageData.DestinationCityID = destinationCity.CityID;

    const createdPackage = await Package.create(packageData, { transaction: t });

    for (const tran of tranList) {
      const { 
        PackageTranWiseExperience: experiences, 
        FromCityName, 
        ToCityName, 
        ...tranData 
      } = tran;

      const fromCity = await City.findOne({ where: { CityName: FromCityName }, transaction: t });
      if (!fromCity) throw new Error(`FromCity '${FromCityName}' not found.`);

      const toCity = await City.findOne({ where: { CityName: ToCityName }, transaction: t });
      if (!toCity) throw new Error(`ToCity '${ToCityName}' not found.`);

      tranData.FromCityID = fromCity.CityID;
      tranData.ToCityID = toCity.CityID;
      tranData.PackageID = createdPackage.PackageID;

      const createdTran = await PackageTran.create(tranData, { transaction: t });

      if (Array.isArray(experiences)) {
        const experienceRecords = experiences.map(exp => ({
          PackageTranID: createdTran.PackageTranID,
          ExperienceID: exp.ExperienceID,
          Created: new Date(),
          Modified: new Date(),
          ModifiedBy: tranData.ModifiedBy || 0,
        }));

        await PackageTranWiseExperience.bulkCreate(experienceRecords, { transaction: t });
      }
    }

    await t.commit();
    return res.status(201).json({ message: 'Package and related data created successfully' });
  } catch (error) {
    await t.rollback();
    console.error('[createNestedPackage] Error:', error);
    return res.status(500).json({ message: error.message || 'Failed to create nested package data.' });
  }
};

export const getPackageSummary = async (req, res) => {
  try {
    const [
      totalPackages,
      activePackages,
      draftPackages,
      totalRegisteredResult,
      tourGuidesAffiliated
    ] = await Promise.all([
      Package.count(),
      Package.count({ where: { Status: 'Active' } }),
      Package.count({ where: { Status: 'Draft' } }),
      Package.sum('Registered'),
      Package.count({ where: { IsTourGuide: true } })
    ]);

    res.status(200).json({
      TotalPackages: totalPackages,
      ActivePackages: activePackages,
      DraftPackages: draftPackages,
      TotalRegistered: totalRegisteredResult || 0,
      TourGuidesAffiliated: tourGuidesAffiliated
    });
  } catch (error) {
    console.error('[getPackageSummary] Error:', error);
    res.status(500).json({ message: 'Failed to fetch package summary' });
  }
};

export const getAllActivePackagesWithDetails = async (req, res) => {
  try {
    const { PackageID } = req.query;

    const whereClause = {
      Status: 'Active',
      ...(PackageID ? { PackageID } : {})
    };

    const packages = await Package.findAll({
      where: whereClause,
      include: [
        {
          model: City,
          as: 'SourceCity',
          attributes: ['CityID', 'CityName']
        },
        {
          model: City,
          as: 'DestinationCity',
          attributes: ['CityID', 'CityName']
        },
        {
          model: PackageTran,
          include: [
            {
              model: Transportation,
              as: 'Transportation',
              attributes: ['TransportationID', 'TransportationName', 'Price', 'DepartureTime', 'ArrivalTime', 'AvailableSeats']
            },
            {
              model: Accommodation,
              as: 'Accommodation',
              attributes: ['AccommodationID', 'AccommodationName', 'PricePerNight']
            },
            {
              model: City,
              as: 'FromCity',
              attributes: ['CityID', 'CityName']
            },
            {
              model: City,
              as: 'ToCity',
              attributes: ['CityID', 'CityName']
            },
            {
              model: Experiences,
              as: 'Experiences',
              attributes: ['ExperienceID', 'ExperienceName', 'Category', 'Amount'],
              through: { attributes: [] }
            }
          ]
        }
      ]
    });

    const enriched = packages.map(pkg => {
      const from = new Date(pkg.FromDate);
      const to = new Date(pkg.ToDate);
      const duration = differenceInDays(to, from);
      return {
        ...pkg.toJSON(),
        Duration: duration >= 0 ? duration : 0
      };
    });

    return res.status(200).json(enriched);
  } catch (error) {
    console.error('[getAllActivePackagesWithDetails] Error:', error);
    return res.status(500).json({ message: 'Failed to fetch active packages with details.' });
  }
};