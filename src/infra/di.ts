import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../domain/user";
import UserService from "../services/user.service";
import { UserRepositoryMongo } from "./db/repositories/users/user.repository.mongo";

export const bootstrapDi = () => {
	const userRepository: UserRepository = new UserRepositoryMongo();
	const userService = new UserService(userRepository);
	const userController = new UserController(userService);

	return { userRepository, userService, userController };
};
