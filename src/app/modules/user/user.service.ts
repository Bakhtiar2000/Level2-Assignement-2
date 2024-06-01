import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exists");
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const res = await User.find();
  return res;
};

const getSingleUserFromDB = async (id: number) => {
  const existingUser = await User.isUserExists(id);
  if (!existingUser) {
    return null;
  }
  const result = await User.findOne({ userId: id });
  return result;
};

const deleteUserFromDB = async (id: number) => {
  const existingUser = await User.isUserExists(id);
  if (!existingUser) {
    return null;
  }
  const result = await User.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

const updateUserFromDB = async (id: number, updateData: TUser) => {
  const existingUser = await User.isUserExists(id);
  if (!existingUser) {
    return null;
  }
  const result = await User.updateOne({ userId: id }, updateData);
  return result;
};

const addNewOrderFromDB = async (id: number, orderData: TOrder) => {
  const existingUser = await User.isUserExists(id);
  if (!existingUser) {
    return null;
  }
  const result = await User.updateOne(
    { userId: id },
    { $push: { orders: orderData } }
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addNewOrderFromDB,
};
