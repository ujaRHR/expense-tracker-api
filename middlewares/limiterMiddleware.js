import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  legacyHeaders: false,
  message: {
    success: "false",
    message: "Too many requests, please try again after few moments.",
  },
});
