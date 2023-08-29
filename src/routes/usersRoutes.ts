import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const bootstrapUserRoutes = (userController: UserController): Router => {
  const router = Router();

  // update user
  router.put("/update", userController.update);

  // deleting user
  router.delete("/delete", userController.delete);

  // fetch User
  router.get("/", userController.fetchAllUsers);

  // for registering user
  router.post("/register", userController.register);

  return router;
};
