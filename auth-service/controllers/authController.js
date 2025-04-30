import bcrypt from 'bcrypt';
import { getUserByIdentifier, getRoleIdByName } from '../services/userService.js';
import { generateOTP, storeOTP, verifyStoredOTP } from '../services/otpService.js';
import { sendOtpToUser } from '../utils/otpSender.js';
import { generateToken } from '../utils/jwtUtil.js';
import { Op } from 'sequelize';
import db from '../config/database.js';
const { User, Role } = db.models;

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

export const registerAgency = async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      confirmPassword,
      dateOfBirth,
      address,
      consent,
      agencyDetails
    } = req.body;
  
    const {
      agencyName,
      businessLicenseNo,
      agencyAddress,
      taxIdentificationNo,
      contactDesignation,
      agencyEmail,
      agencyPhone,
      logoImgPath,
      taxDocument,
      licenseDocument
    } = agencyDetails;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    const t = await db.sequelize.transaction();
    try {
      const roleId = await getRoleIdByName('TravelAgency');
  
      const existing = await db.models.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [{ Email: email }, { Mobile: mobile }]
        }
      });
  
      if (existing) {
        return res.status(409).json({ message: 'User with email or phone already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await db.models.User.create({
        RoleID: roleId,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Mobile: mobile,
        Password: hashedPassword,
        DateOfBirth: dateOfBirth,
        Address: address,
        IsPartner: true,
        IsEmail: consent?.isEmail ?? false,
        IsSMS: consent?.isSMS ?? false,
        IsWhatsapp: false,
        Status: 'Pending',
        Created: new Date(),
        Modified: new Date(),
        ModifiedBy: null
      }, { transaction: t });
  
      await db.models.TravelAgency.create({
        UserID: user.UserID,
        BusinessLicenseNo: businessLicenseNo,
        Address: agencyAddress,
        TaxIdentificationNo: taxIdentificationNo,
        PrimaryContactPersonName: `${firstName} ${lastName}`,
        PrimaryContactPersonDesignation: contactDesignation,
        Email: agencyEmail,
        Phone: agencyPhone,
        LogoImgPath: logoImgPath,
        TaxDocument: taxDocument,
        LicenseDocument: licenseDocument,
        Created: new Date(),
        Modified: new Date(),
        ModifiedBy: user.UserID
      }, { transaction: t });
  
      await t.commit();
  
      const token = generateToken({ userId: user.UserID, role: 'TravelAgency' });
  
      return res.status(201).json({
        message: 'Signup successful. Pending approval.',
        token,
        role: 'TravelAgency',
        redirectTo: getRedirectPath('TravelAgency')
      });
  
    } catch (err) {
      await t.rollback();
      console.error('Travel agency signup failed:', err);
      return res.status(500).json({ message: 'Travel agency signup failed' });
    }
};

export const registerTourGuide = async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      confirmPassword,
      dateOfBirth,
      address,
      consent,
      guideDetails
    } = req.body;
  
    const {
      languageSpoken,
      specialization,
      yearsOfExperience,
      cityIds // array of city IDs for TourGuideTran
    } = guideDetails;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    const t = await db.sequelize.transaction();
    try {
      const roleId = await getRoleIdByName('TourGuide');
  
      const existingUser = await db.models.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [{ Email: email }, { Mobile: mobile }]
        }
      });
  
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await db.models.User.create({
        RoleID: roleId,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Mobile: mobile,
        Password: hashedPassword,
        DateOfBirth: dateOfBirth,
        Address: address,
        IsPartner: true,
        IsEmail: consent?.isEmail ?? false,
        IsSMS: consent?.isSMS ?? false,
        IsWhatsapp: false,
        Status: 'Pending',
        Created: new Date(),
        Modified: new Date(),
        ModifiedBy: null
      }, { transaction: t });
  
      const tourGuide = await db.models.TourGuide.create({
        UserID: user.UserID,
        LanguageSpoken: languageSpoken,
        Specialization: specialization || null,
        YearsOfExperience: yearsOfExperience,
        Address: address,
        Status: 'Pending',
        Created: new Date(),
        Modified: new Date(),
        ModifiedBy: user.UserID
      }, { transaction: t });
  
      // Insert into TourGuideTran (many-to-many city map)
      if (Array.isArray(cityIds) && cityIds.length > 0) {
        const cityMappings = cityIds.map((cityId) => ({
          TourGuideID: tourGuide.TourGuideID,
          CityID: cityId,
          Created: new Date(),
          Modified: new Date(),
          ModifiedBy: user.UserID
        }));
  
        await db.models.TourGuideTran.bulkCreate(cityMappings, { transaction: t });
      }
  
      await t.commit();
  
      const token = generateToken({ userId: user.UserID, role: 'TourGuide' });
  
      return res.status(201).json({
        message: 'Tour guide registered successfully. Pending admin approval.',
        token,
        role: 'TourGuide',
        redirectTo: getRedirectPath('TourGuide')
      });
  
    } catch (err) {
      await t.rollback();
      console.error('Tour guide signup failed:', err);
      return res.status(500).json({ message: 'Tour guide signup failed' });
    }
};