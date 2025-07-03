import User from "../../models/User.js";
import { issueJWT } from "../../utils/jwt.js";
import { comparePassword } from "../../utils/bcrypt.js";
import validateInput from "../../utils/validators/userValidator.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { isValid, errors } = validateInput.login(email, password);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "validation failed, check the input data",
      reason: errors,
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "No user is registered with this email",
      });
    }

    const hashedPassword = existingUser.password;
    const isPasswordValid = await comparePassword(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password, try again",
      });
    }

    res.status(200).json({
      success: true,
      message: "User login successful",
      data: {
        user: {
          id: existingUser._id,
          fullname: existingUser.fullname,
          email: existingUser.email,
        },
        token: await issueJWT({
          id: existingUser._id,
          fullname: existingUser.fullname,
          email: existingUser.email,
        }),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
