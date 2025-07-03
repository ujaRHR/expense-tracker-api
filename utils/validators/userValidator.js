import { validateEmail } from "./emailValidator.js";

export const validateSignupInput = (fullname, email, password) => {
  const errors = [];

  if (typeof fullname !== "string" || fullname.length < 3) {
    errors.push("Fullname must be at least 3 characters");
  }

  if (!validateEmail(email)) {
    errors.push("Invalid email address");
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
