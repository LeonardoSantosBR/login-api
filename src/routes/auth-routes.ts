import { Router } from "express";
import { authController } from "../usecases/auth/index";

const authRouter = Router();

authRouter.post("/signin", (request, response) => {
  return authController.signIn(request, response);
});

export { authRouter };
