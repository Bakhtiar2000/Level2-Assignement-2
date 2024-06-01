import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

//Will call controller function
router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.get("/:id", userControllers.getSingleUser);
router.delete("/:id", userControllers.deleteUser);
router.put("/:id", userControllers.updateUser);
router.put("/:id/orders", userControllers.addNewOrder);
router.get("/:id/orders", userControllers.getAllOrders);

export const userRoutes = router;
