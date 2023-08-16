import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const bootstrapUserRoutes = (userController: UserController): Router => {
	const router = Router();

	// update user

	router.put("/update/:id", userController.update);

	// deleting user
	router.delete("/delete/:id", userController.delete);

	// fetch User
	router.get("/fetch/:id", userController.fetch);
	router.get("/", userController.fetchAllUsers);

	// for registering user
	router.post("/register", userController.register);

	return router;
};

//  fetch userdata
// router.get("/all", User.getAllUsers)

// create userdata

// updating user

// router.post("/update", User.updateUserData)

// get user by id
// router.get("/userid/:id", User.getUserById)
