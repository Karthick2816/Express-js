import express from "express";
import UserController from "../controller/user.js";
const router = express.Router();
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getAllUsersById);
router.post("/", UserController.AddUsers);
router.put("/:id", UserController.editUsersById);
router.delete("/:id", UserController.deleteUserById);

export default router;
