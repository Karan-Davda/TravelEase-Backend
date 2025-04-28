export const validateLoginInput = (req, res, next) => {
    const { identifier } = req.body;
  
    if (!identifier) {
      return res.status(400).json({ message: 'Identifier (email or phone) is required.' });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{9,14}$/; // accepts international formats
  
    if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      return res.status(400).json({ message: 'Identifier must be a valid email or phone number.' });
    }
  
    next();
  };  