import { Router } from "express";
import { userController } from "../usecases/users/index";

const userRouter = Router();

userRouter.post("/users", (request, response) => {
  return userController.create(request, response);
});

userRouter.get("/users", (request, response) => {
  return userController.findAll(request, response);
});

userRouter.get("/users/:id", (request, response) => {
  return userController.findAll(request, response);
});

userRouter.patch("/users/:id", (request, response) => {
  return userController.patch(request, response);
});

userRouter.delete("/users/:id", (request, response) => {
  return userController.delete(request, response);
});

export { userRouter };
