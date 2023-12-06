/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
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
});

// userSchema.pre('save', async function () {
//   const user = this;
//   user.password = await bcrypt.hash(user.password, Number(config.bcrypt));
// });
userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};
// userSchema.post('save', function () {
//   console.log('ldfjjf');
// });

export const UserModel = model<TUser, TUserModel>('User', userSchema);
