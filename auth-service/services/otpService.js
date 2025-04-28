// ✅ otpService.js
const otpStore = new Map();

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = (identifier, otp) => {
  otpStore.set(identifier, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
};

export const verifyStoredOTP = (identifier, enteredOtp) => {
  const record = otpStore.get(identifier);
  if (!record) return false;
  const isValid = record.otp === enteredOtp && Date.now() < record.expiresAt;
  if (isValid) otpStore.delete(identifier);
  return isValid;
};