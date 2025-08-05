// src/middlewares/auth.middleware.js
import { verifyToken } from "../utils/token.js";

export const authenticate = (req, res, next) => {
  try {
    // 1. Get the Authorization header from the incoming request.
    const authHeader = req.headers['authorization'];

    // 2. Check if the header exists and starts with "Bearer ".
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Access Denied. No valid token provided." });
    }

    // 3. Extract the token from the "Bearer <token>" string.
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied. Token is missing." });
    }

    // 4. Verify the token.
    const decoded = verifyToken(token);
    
    // 5. Attach the decoded user information (e.g., user ID) to the request object.
    req.user = decoded;
    
    // 6. Continue to the next function in the route (e.g., addToHistory).
    next();
  } catch (err) {
    // This will catch errors from verifyToken if the token is invalid or expired.
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
