import { Request, Response } from "express";
import userValidationSchema, { orderValidationSchema } from "./user.validation";
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
      message: "Something went wrong",
      error: {
        code: 404,
        description: "Something went wrong!",
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
        message: "user deleted successfully",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: 404,
        description: "Something went wrong!",
      },
    });
  }
};

// Update user controller
const updateUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const { id } = req.params;
    const validatedData = userValidationSchema.parse(userData);
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
    const result = await userServices.updateUserFromDB(
      numericId,
      validatedData
    );

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
        message: "user updated successfully",
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: 404,
        description: "Something went wrong!",
      },
    });
  }
};

// Add order controller
const addNewOrder = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { id } = req.params;
    const validatedData = orderValidationSchema.parse(userData);
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
    const result = await userServices.addNewOrderFromDB(
      numericId,
      validatedData
    );

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
        message: "Order created successfully",
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: 404,
        description: "Something went wrong!",
      },
    });
  }
};

// get all order controller
const getAllOrders = async (req: Request, res: Response) => {
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
    const result = await userServices.getAllOrdersFromDB(numericId);
    console.log(result);
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
        message: "Order fetched successfully",
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "Something went wrong!",
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addNewOrder,
  getAllOrders,
};
