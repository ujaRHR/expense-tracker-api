import { verifyJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    const encodedToken = req.header("Authorization");
    req.user = await verifyJWT(encodedToken);
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
      reason: err.message,
    });
  }
};
