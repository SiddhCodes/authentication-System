import UserModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log("All fields are required");
  }

  const isAlreadyRegistered = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    res.status(409).json({
      message: "Username or email already exists",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    config.JTW_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.status(201).json({
    message: "User registered succesfully",
    user: {
      username: newUser.username,
      email: newUser.email,
    },
    token,
  });
};

export const getMe = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "token not found",
    });
  }

  const decoded = jwt.verify(token, config.JTW_SECRET);

  const user = await UserModel.findById(decoded.id);

  res.status(200).json({
    message: "user fetched succesfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
};
