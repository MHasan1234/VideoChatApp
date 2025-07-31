import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3d", // token valid for 3 days
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
