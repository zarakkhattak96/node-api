import { container } from "tsyringe";
import { UserController } from "../http/controllers/user.controller";
import UserService from "../application/services/user.service";
import { UserRepositoryPrisma } from "./db/repositories";
import bootstrapDiRegister from "./di.register";

// using tsyringe for dependency injection

const bootstrapDi = async () => {
  await bootstrapDiRegister();
  const userRepository = container.resolve(UserRepositoryPrisma);
  const userService = container.resolve(UserService);
  const userController = container.resolve(UserController);
  const userRepoInterface = container.resolve(UserRepositoryPrisma);

  return { userRepository, userService, userController };
};

export default bootstrapDi;
