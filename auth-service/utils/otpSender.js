import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOtpToUser = async (email, otp) => {
  const mailOptions = {
    from: `"TravelEase" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your TravelEase OTP',
    html: `<p>Your OTP is: <b>${otp}</b>. It is valid for 5 minutes.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw err;
  }
};
