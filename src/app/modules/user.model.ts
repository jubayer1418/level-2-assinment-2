/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../config';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  TUserModel,
} from './user/user.interface';
const fullNameSchema = new Schema<TFullName>(
  {
    firstName: { type: String, required: [true, 'First name is requored!'] },
    lastName: { type: String, required: [true, 'Last name is requored!'] },
  },
  { _id: false },
);
const addressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: [true, 'Street is requored!'] },
    city: { type: String, required: [true, 'City is requored!'] },
    country: { type: String, required: [true, 'Country is requored!'] },
  },
  { _id: false },
);
const orderSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
      required: [true, 'Product name is requored!'],
    },
    price: { type: Number, required: [true, 'Product price is requored!'] },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is requored!'],
    },
  },
  { _id: false },
);
const userSchema = new Schema<TUser, TUserModel>({
  userId: {
    type: Number,
    required: [true, 'Userid is requored!'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User name is requored!'],
    unique: true,
  },
  password: { type: String, required: [true, 'password is requored!'] },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Fullname is requored!'],
  },
  age: { type: Number, required: [true, 'Age is requored!'] },
  email: { type: String, required: [true, 'Email is requored!'], unique: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String], required: [true, 'Hobbies is requored!'] },
  address: { type: addressSchema, required: [true, 'Address is requored!'] },
  orders: { type: [orderSchema], required: false },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt));
  next();
});

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};
export const User = model<TUser, TUserModel>('User', userSchema);
