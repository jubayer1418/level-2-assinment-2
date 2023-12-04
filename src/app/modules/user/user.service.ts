import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const getAllUserFromDb = async () => {
  const result = await UserModel.find();
  return result;
};
const getSingleUserFromDb = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};
const updateUserFromDb = async (id: number, updateData: object) => {
  const result = await UserModel.updateOne(
    { userId: id },
    { $set: updateData },
  );
  return result;
};
const deleteUserFromDb = async (id: number) => {
  const result = await UserModel.deleteOne({ userId: id });
  return result;
};
export const userService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  deleteUserFromDb,
  updateUserFromDb,
};
