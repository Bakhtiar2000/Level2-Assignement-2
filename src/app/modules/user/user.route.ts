import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

//Will call controller function
router.post("/create-user", userControllers.createUser);
// router.get("/:id", userControllers.getSingleUser);
// router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
