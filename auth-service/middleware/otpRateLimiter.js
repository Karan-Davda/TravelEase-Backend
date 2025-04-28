const otpRequestCounts = new Map(); // key = identifier, value = array of timestamps
const LIMIT = 3;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export const otpRateLimiter = (req, res, next) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ message: 'Identifier is required for OTP' });
  }

  const now = Date.now();
  const timestamps = otpRequestCounts.get(identifier) || [];

  // Filter out timestamps older than the window
  const recentRequests = timestamps.filter(ts => now - ts < WINDOW_MS);

  if (recentRequests.length >= LIMIT) {
    console.warn(`OTP rate limit exceeded for ${identifier}`);
    return res.status(429).json({
      message: `Too many OTP requests. Try again in ${Math.ceil((WINDOW_MS - (now - recentRequests[0])) / 1000)} seconds.`
    });
  }

  // Store updated timestamps
  recentRequests.push(now);
  otpRequestCounts.set(identifier, recentRequests);

  console.log(`OTP rate OK for ${identifier}`);
  next();
};