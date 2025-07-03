import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

// Issue JWT for 3 day
export const issueJWT = async (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, jwtSecret, { expiresIn: "3d" }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

// Verify JWT token
export const verifyJWT = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};
