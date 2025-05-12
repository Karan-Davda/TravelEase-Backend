import db from '../config/Database.js';
const { Bookings, BookingsTran, Transportation, TransportationTran } = db.models;

export const confirmBooking = async (req, res) => {
  const {
    userId,
    transportationId,
    accommodationId = null,
    seatNumbers = [],
    paymentId,
    amount
  } = req.body;

  if (!userId || !transportationId || seatNumbers.length === 0 || !paymentId) {
    return res.status(400).json({ message: 'Missing required booking information.' });
  }

  const t = await db.sequelize.transaction();

  try {
    // Step 1: Validate seat existence and status
    const seats = await TransportationTran.findAll({
      where: {
        TransportationID: transportationId,
        SeatNumber: seatNumbers
      },
      transaction: t
    });

    const foundSeats = seats.map(seat => seat.SeatNumber);
    const missingSeats = seatNumbers.filter(s => !foundSeats.includes(s));
    const alreadyBooked = seats.filter(s => s.Status === 'Booked').map(s => s.SeatNumber);

    if (missingSeats.length > 0 || alreadyBooked.length > 0) {
      await t.rollback();
      return res.status(400).json({
        message: 'Seat validation failed.',
        missingSeats,
        alreadyBooked
      });
    }

    // Step 2: Create Booking entry
    const booking = await Bookings.create({
      UserID: userId,
      TransportationID: transportationId,
      AccommodationID: accommodationId,
      BookingDate: new Date(),
      Status: 'Confirmed',
      ModifiedBy: userId
    }, { transaction: t });


    const transportation = await Transportation.findOne({
      where: { TransportationID: transportationId },
      transaction: t
    });

    if (!transportation) {
      await t.rollback();
      return res.status(404).json({ message: 'Transportation not found.' });
    }

    // Extract required values
    const FromCityId = transportation.FromCityID;
    const ToCityId = transportation.ToCityID;
    const FromDate = transportation.DepartureTime;

    // Step 3: Create Booking Tran entries
    const bookingTranData = seatNumbers.map(seat => ({
      BookingID: booking.BookingID,
      FromCityID: FromCityId,
      ToCityID: ToCityId,
      FromDate: FromDate,
      ToDate: FromDate,
      IsAccommodation: false,
      IsTransportation: true,
      TransportationTranID: seats.find(s => s.SeatNumber === seat)?.TransportationTranID,
      Created: new Date(),
      Modified: new Date(),
      ModifiedBy: userId
    }));
    await BookingsTran.bulkCreate(bookingTranData, { transaction: t });

    // Step 4: Update TransportationTran seat statuses
    await TransportationTran.update(
      { Status: 'Booked' },
      {
        where: {
          TransportationID: transportationId,
          SeatNumber: seatNumbers
        },
        transaction: t
      }
    );

    // Step 5: Decrease AvailableSeats count
    await Transportation.increment(
      { AvailableSeats: -seatNumbers.length },
      {
        where: { TransportationID: transportationId },
        transaction: t
      }
    );

    await t.commit();
    return res.status(200).json({
      message: 'Booking confirmed successfully',
      bookingId: booking.BookingID
    });

  } catch (error) {
    await t.rollback();
    console.error('[confirmBooking] Failed:', error);
    return res.status(500).json({ message: 'Booking confirmation failed.' });
  }
};