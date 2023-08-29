import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../domain/user";
import UserService from "../services/user.service";
import { UserRepositoryPrisma } from "./db/repositories/users/user.repository.pris";

export const bootstrapDi = () => {
  const userRepository: UserRepository = new UserRepositoryPrisma();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  return { userRepository, userService, userController };
};
