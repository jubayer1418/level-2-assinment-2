import bcrypt from 'bcrypt';
import config from '../../config';
import { User } from '../user.model';
import { TUser } from './user.interface';
const createUserIntoDb = async (user: TUser) => {
  const data = await User.create(user);
  const result = await User.findOne({ userId: data.userId }).select([
    '-password',
    '-orders',
    '-_id',
  ]);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.find().select([
    'username',
    'fullName',
    'age',
    'email',
    'address',
    '-_id',
  ]);
  return result;
};
const getSingleUserFromDb = async (id: number) => {
  const isUser = await User.findOne({ userId: id }).select([
    '-password',
    '-orders',
    '-_id',
  ]);
  if (!isUser) {
    throw new Error('User not found!');
  } else {
    return isUser;
  }
};
const updateUserFromDb = async (
  userId: number,
  updateData: Record<string, unknown>,
) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(
      updateData.password as string,
      Number(config.bcrypt),
    );
  }
  const result = await User.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  }).select(['-password', '-orders', '-_id']);

  return result;
};

const updateUserOrderFromDb = async (
  id: number,
  updateData: Record<string, unknown>,
) => {
  const result = await User.findOneAndUpdate(
    { userId: id },
    { $push: { orders: updateData } },
  );
  if (!result) {
    throw new Error('User not found!');
  }
  return true;
};
const getUserOrderFromDb = async (id: number) => {
  const allProduct = await User.findOne({ userId: id }).select('orders -_id');
  return allProduct;
};
const getTotalOrderFromDb = async (id: number) => {
  const total = await User.aggregate([
    { $match: { userId: id } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return total[0];
};
const deleteUserFromDb = async (id: number) => {
  const result = await User.findOneAndDelete({ userId: id });
  return result;
};
export const userService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  deleteUserFromDb,
  updateUserFromDb,
  updateUserOrderFromDb,
  getUserOrderFromDb,
  getTotalOrderFromDb,
};
