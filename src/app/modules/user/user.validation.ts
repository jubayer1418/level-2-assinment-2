import { z } from 'zod';
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(20),
  password: z.string().max(20),
  fullName: z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.tuple([z.string(), z.string()]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});
export default userValidationSchema;
