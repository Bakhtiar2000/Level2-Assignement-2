import { Request, Response } from "express";
import userValidationSchema from "./user.validation";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const validatedData = userValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDB(validatedData);

    //Send Response
    res.status(200).json({
      success: true,
      message: "User is created successfully",
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

export const userControllers = {
  createUser,
};
