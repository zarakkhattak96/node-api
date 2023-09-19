import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
  validateCreatedUser,
  validateUpdatedUser,
} from "../validation/validator.instances";
import validateInput from "../middleware/validation.middleware";

export const bootstrapUserRoutes = (userController: UserController): Router => {
  const router = Router();

  // update user

  // router.put("/update", userController.update);
  router.route("/update").patch(validateUpdatedUser, userController.update);

  // deleting user
  router.delete("/delete", userController.delete);

  // fetch User
  router.get("/", userController.fetchAllUsers);

  // for registering user
  router.route("/register").post(validateCreatedUser, userController.register);

  return router;
};
