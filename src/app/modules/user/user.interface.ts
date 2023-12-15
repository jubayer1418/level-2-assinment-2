import { Model } from 'mongoose';

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: { firstName: string; lastName: string };
  age: number;

  email: string;
  isActive: boolean;
  hobbies: [string, string];
  address: { street: string; city: string; country: string };
  orders: [{ productName: string; price: number; quantity: number }];
};
export interface TUserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}
