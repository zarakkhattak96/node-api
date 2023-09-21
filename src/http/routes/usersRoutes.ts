import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
  validateCreatedUser,
  validateDeletedUser,
  validateUpdatedUser,
} from "../../application/dtos/validation/validator.instances";

export const bootstrapUserRoutes = (userController: UserController): Router => {
  const router = Router();

  // update user

  // router.put("/update", userController.update);
  router.route("/update").patch(validateUpdatedUser, userController.update);

  // deleting user
  router.route("/delete").delete(validateDeletedUser, userController.delete);

  // fetch User
  router.get("/", userController.fetchAllUsers);

  // for registering user
  router.route("/register").post(validateCreatedUser, userController.register);

  return router;
};
