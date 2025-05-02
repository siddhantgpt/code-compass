import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  return { message: "User registered successfully" };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { token };
};

export const changeUserPassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);
  if (!user || !user.password) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Incorrect current password");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return { message: "Password updated successfully" };
};
