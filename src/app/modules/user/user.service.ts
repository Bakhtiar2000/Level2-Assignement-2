import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exists");
  }
  const res = await User.create(userData);
  return res;
};

const getAllUsersFromDB = async () => {
  const res = await User.find();
  return res;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
