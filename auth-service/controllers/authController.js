import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByIdentifier } from '../services/userService.js';
import { generateOTP, storeOTP, verifyStoredOTP } from '../services/otpService.js';
import { sendOtpToUser } from '../utils/otpSender.js';
import { generateToken } from '../utils/jwtUtil.js';
import { User, Role } from '../models/index.js';
import { Op } from 'sequelize';

const getRedirectPath = (role) => {
    switch (role) {
        case 'Admin': return '/dashboard/admin';
        case 'Traveler': return '/dashboard/traveler';
        case 'TravelAgency': return '/dashboard/agency';
        case 'TourGuide': return '/dashboard/guide';
        default: return '/';
    }
};

export const loginWithPassword = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await getUserByIdentifier(identifier);
        if (!user) return res.status(401).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

        const token = generateToken({ userId: user.UserID, role: user.Role.RoleName });
        return res.json({ token, role: user.Role.RoleName, redirectTo: getRedirectPath(user.Role.RoleName) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login failed' });
    }
};

export const sendOtp = async (req, res) => {
    const { identifier } = req.body;
  
    try {
      const user = await getUserByIdentifier(identifier);
      if (!user) {
        console.warn(' No user found for:', identifier);
        return res.status(401).json({ message: 'User not found' });
      }
  
      const otp = generateOTP();
      await storeOTP(identifier, otp);
      await sendOtpToUser(identifier, otp);
  
      return res.json({ message: 'OTP sent successfully' });
    } catch (err) {
      console.error('[sendOtp] Failed:', err);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
  };
    
export const verifyOtp = async (req, res) => {
    const { identifier, otp } = req.body;
    try {
        const isValid = await verifyStoredOTP(identifier, otp);
        if (!isValid) return res.status(401).json({ message: 'Invalid or expired OTP' });

        const user = await getUserByIdentifier(identifier);
        const token = generateToken({ userId: user.UserID, role: user.Role.RoleName });

        return res.json({ token, role: user.Role.RoleName, redirectTo: getRedirectPath(user.Role.RoleName) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'OTP verification failed' });
    }
};

export const signUpTraveler = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        mobile,
        password,
        confirmPassword,
        dateOfBirth,
        address,
        consent
    } = req.body;

    try {
        // 1. Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ Email: email }, { Mobile: mobile }]
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Email or phone already in use.' });
        }

        // 3. Get Traveler RoleID
        const travelerRole = await Role.findOne({ where: { RoleName: 'Traveler' } });
        if (!travelerRole) return res.status(500).json({ message: 'Traveler role not found in system' });

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create new user
        const now = new Date();
        const newUser = await User.create({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Mobile: mobile,
            Password: hashedPassword,
            DateOfBirth: dateOfBirth,
            Address: address,
            IsEmail: consent.isEmail || false,
            IsSMS: consent.isSMS || false,
            IsWhatsapp: false,
            IsPartner: false,
            Status: 'Active',
            RoleID: travelerRole.RoleID,
            Created: now,
            Modified: now,
            ModifiedBy: null // or set to same user after creation (need extra logic if so)
        });

        return res.status(201).json({ message: 'Traveler signed up successfully', userId: newUser.UserID });
    } catch (error) {
        console.error('Traveler signup failed:', error);
        return res.status(500).json({ message: 'Signup failed, please try again.' });
    }
};