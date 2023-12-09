import express from "express";
import UserController from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/authorise", UserController.authorise);

userRouter.get("/getUser/:id", UserController.getUser);

export default userRouter;