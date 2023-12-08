import express from "express";
import UserController from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/authorise", UserController.authorise);

export default userRouter;