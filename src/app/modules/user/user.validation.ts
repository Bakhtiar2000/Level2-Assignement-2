import { z } from "zod";

// FullName Validation Schema
const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(15, "First name cannot have more than 15 characters"),
  lastName: z
    .string()
    .trim()
    .max(15, "Last name cannot have more than 15 characters"),
});

// Address Validation Schema
const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

// Order Validation Schema
export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

// User Validation Schema
const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number().int().positive(),
  email: z.string().email("Invalid email format"),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
  isDeleted: z.boolean(),
});

export default userValidationSchema;
