import { Request, Response } from "express";
import userValidationSchema from "./user.validation";
import { userServices } from "./user.service";

// Create user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const validatedData = userValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDB(validatedData);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// Get single user by id
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
        error: {
          code: 400,
          description: "User id must be a number!",
        },
      });
    }
    const result = await userServices.getSingleUserFromDB(numericId);
    if (result == null) {
      res.status(500).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// Delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
        error: {
          code: 400,
          description: "User id must be a number!",
        },
      });
    }
    const result = await userServices.deleteUserFromDB(numericId);

    if (result.modifiedCount == 0) {
      res.status(500).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
