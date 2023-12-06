import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDb = async (user: TUser) => {
  const data = await User.create(user);
  const result = await User.findOne({ userId: data.userId }, { password: 0 });
  return result;
};
const getAllUserFromDb = async () => {
  const result = await User.find(
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
  if (await User.findOne({ userId: id })) {
    const result = await User.findOne({ userId: id }, { password: 0 });
    return result;
  } else {
    await User.isUserExists(id);
    throw new Error('User not found!');
  }
};
const updateUserFromDb = async (id: number, updateData: object) => {
  if (await User.findOne({ userId: id })) {
    await User.updateOne({ userId: id }, { $set: updateData });
    const result = await User.findOne({ userId: id }, { password: 0 });
    return result;
  } else {
    await User.isUserExists(id);
    throw new Error('User not found!');
  }
};
const deleteUserFromDb = async (id: number) => {
  if (await User.findOne({ userId: id })) {
    const result = await User.deleteOne({ userId: id });
    return result;
  } else {
    await User.isUserExists(id);
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
