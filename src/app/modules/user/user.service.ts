import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserIntoDb = async (user: User) => {
  const data = await UserModel.create(user);
  const result = await UserModel.findOne(
    { userId: data.userId },
    { password: 0 },
  );
  return result;
};
const getAllUserFromDb = async () => {
  const result = await UserModel.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    },
  );
  return result;
};
const getSingleUserFromDb = async (id: number) => {
  const result = await UserModel.findOne({ userId: id }, { password: 0 });
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
