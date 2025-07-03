import User from "../../models/User.js";
import { issueJWT } from "../../utils/jwt.js";
import { hashPassword } from "../../utils/bcrypt.js";
import validateInput from "../../utils/validators/userValidator.js";

export const userSignup = async (req, res) => {
  const { fullname, email, password } = req.body;
  const { isValid, errors } = validateInput.signup(fullname, email, password);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "validation failed, check the input data",
      reason: errors,
    });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "The email address you provided is already in use",
      });
    }

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        token: await issueJWT({
          id: user._id,
          fullname: user.fullname,
          email: user.email,
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
