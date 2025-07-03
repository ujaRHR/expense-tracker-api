import { validateEmail } from "./emailValidator.js";

const validateInput = {};

validateInput.signup = (fullname, email, password) => {
  const errors = [];

  if (typeof fullname !== "string" || fullname.length < 3) {
    errors.push({
      field: "fullname",
      message: "Fullname must be at least 3 characters",
    });
  }

  if (!validateEmail(email)) {
    errors.push({
      field: "email",
      message: "Invalid email address",
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

validateInput.login = (email, password) => {
  const errors = [];

  if (!validateEmail(email)) {
    errors.push({
      field: "email",
      message: "Invalid email address",
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default validateInput;
