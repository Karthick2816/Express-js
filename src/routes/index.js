import express from "express";
import IndexController from "../controller/index.js";
import UseRoutes from "./user.js";
const router = express.Router();
router.get("/", IndexController.homePage);
router.use("/user", UseRoutes);
export default router;
