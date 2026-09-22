import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

// Rate Limiting Middlewares
export const publicSubmissionLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 submissions per `window`
  message: { error: 'Too many submissions from this IP, please try again later.' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: { error: 'Too many requests to admin endpoints, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Hardened Basic Auth Middleware
export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Basic (.+)$/);
  
  if (!match) {
    return res.status(401).json({ error: 'Unauthorized: Missing or malformed Basic Auth header' });
  }
  
  let username, password;
  try {
    const decoded = Buffer.from(match[1], 'base64').toString('utf8');
    const splitIndex = decoded.indexOf(':');
    if (splitIndex === -1) throw new Error('Invalid format');
    username = decoded.substring(0, splitIndex);
    password = decoded.substring(splitIndex + 1);
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Base64 encoding' });
  }
  
  // Timing-safe comparison to prevent side-channel attacks
  // Must ensure both strings are exactly the same length before comparison,
  // or use a strategy to mitigate length-leakage.
  const expectedUsername = Buffer.from(process.env.ADMIN_USERNAME);
  const expectedPassword = Buffer.from(process.env.ADMIN_PASSWORD);
  const providedUsername = Buffer.from(username);
  const providedPassword = Buffer.from(password);

  // If lengths don't match, we still do a dummy comparison to mitigate timing leaks
  const usernameMatch = providedUsername.length === expectedUsername.length && crypto.timingSafeEqual(providedUsername, expectedUsername);
  const passwordMatch = providedPassword.length === expectedPassword.length && crypto.timingSafeEqual(providedPassword, expectedPassword);

  if (usernameMatch && passwordMatch) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Incorrect credentials' });
  }
};
