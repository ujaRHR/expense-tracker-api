import bcrypt from "bcrypt";

export const hashPassword = async (password, rounds = 10) => {
  try {
    const hash = await bcrypt.hash(password, rounds);
    return hash;
  } catch (err) {
    return { error: "Failed to hash the data", reason: err.errMsg };
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (err) {
    return { error: "Something went wrong", reason: err.errMsg };
  }
};
