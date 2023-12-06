import { UserModel } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDb = async (user: TUser) => {
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
  if (await UserModel.findOne({ userId: id })) {
    const result = await UserModel.findOne({ userId: id }, { password: 0 });
    return result;
  } else {
    await UserModel.isUserExists(id);
    throw new Error('User not found!');
  }
};
const updateUserFromDb = async (id: number, updateData: object) => {
  if (await UserModel.findOne({ userId: id })) {
    await UserModel.updateOne({ userId: id }, { $set: updateData });
    const result = await UserModel.findOne({ userId: id }, { password: 0 });
    return result;
  } else {
    await UserModel.isUserExists(id);
    throw new Error('User not found!');
  }
};
const deleteUserFromDb = async (id: number) => {
  if (await UserModel.findOne({ userId: id })) {
    const result = await UserModel.deleteOne({ userId: id });
    return result;
  } else {
    await UserModel.isUserExists(id);
    throw new Error('User not found!');
  }
};
export const userService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  deleteUserFromDb,
  updateUserFromDb,
};
