import { User } from "../models/User";

export const findUserProfile = async (userId: string) => {
  return await User.findById(userId).select("email fullName dob createdAt");
};

export const updateUserProfile = async (
  userId: string,
  updates: { email?: string; fullName?: string; dob?: Date }
) => {
  const user = await User.findById(userId);
  if (!user) return null;

  if (updates.email) user.email = updates.email;
  if (updates.fullName) user.fullName = updates.fullName;
  if (updates.dob) user.dob = updates.dob;

  await user.save();
  return user;
};
