import express from 'express';
import { validateLoginInput } from '../middleware/validateLogin.js';
import { otpRateLimiter } from '../middleware/otpRateLimiter.js';
import { loginWithPassword, sendOtp, verifyOtp, signUpTraveler } from '../controllers/authController.js';

const router = express.Router();

// Password based login
router.post('/login', validateLoginInput, loginWithPassword);

// OTP based login
router.post('/otp', validateLoginInput, otpRateLimiter, sendOtp);
router.post('/otp/verify', validateLoginInput, verifyOtp);

//signup
router.post('/signup', signUpTraveler);


export default router;