import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from "./user.interface";

//FullName schema
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

// Address Schema
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
});

// Order Schema
const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

// User Schema
const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, "User ID is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "Full name is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  isActive: {
    type: Boolean,
    enum: ["active", "blocked"],
    default: "active",
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
    required: [true, "Address is required"],
  },
  orders: {
    type: [orderSchema],
    required: [true, "Orders are required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Middleware / Hook
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//Static method to find unique user
userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

//Student Model
export const User = model<TUser, UserModel>("User", userSchema);
