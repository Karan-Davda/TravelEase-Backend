import axios from 'axios';
import db from '../config/Database.js';
const { Payments, PaymentType } = db.models;

export const processSuccessfulPayment = async (metadata, amount, stripeIntentId) => {
  const {
    userId,
    transportationId,
    accommodationId,
    seats = ''
  } = metadata;

  const payment = await Payments.create({
    PaymentDate: new Date(),
    Status: 'Success',
    Amount: amount,
    TransactionID: stripeIntentId,
    PaymentTypeID: 1,
    Created: new Date(),
    Modified: new Date(),
    ModifiedBy: userId || 0
  });

  const seatArray = seats.split(',').map(s => s.trim());

  await axios.post('http://localhost:3000/api/bookings/confirm', {
    paymentId: payment.PaymentID,
    userId: parseInt(userId),
    transportationId: transportationId ? parseInt(transportationId) : null,
    accommodationId: accommodationId ? parseInt(accommodationId) : null,
    seatNumbers: seatArray,
    amount: amount
  });
};