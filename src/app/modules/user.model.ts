/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../config';
import { TUser, TUserModel } from './user/user.interface';
const userSchema = new Schema<TUser, TUserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});

userSchema.pre('save', async function () {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt));
});
// userSchema.pre('updateOne', async function () {
//   const user = this;
//   user
// });
userSchema.post('save', function () {
  console.log('pore');
});

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};
export const User = model<TUser, TUserModel>('User', userSchema);
