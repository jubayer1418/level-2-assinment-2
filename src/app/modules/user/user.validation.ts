import { z } from 'zod';
const fullNameValidation = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});
const addressValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const ordersValidation = z.object({
  productName: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1),
});
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(20),
  password: z.string(),
  fullName: fullNameValidation,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidation,
  orders: z.array(ordersValidation).optional(),
});
export default userValidationSchema;
