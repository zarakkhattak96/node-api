import { container } from "tsyringe";
import UserService from "../application/services/user.service";
import { UserController } from "../http/controllers/user.controller";
import { UserRepositoryPrisma } from "./db/repositories";
import { UserRepoInterface } from "./db/repositories/users/user.repo.interface";

const bootstrapDiRegister = async () => {
  const userServiceRegister = container.register<UserService>("UserService", {
    useClass: UserService,
  });
  const userControllerRegister = container.register<UserController>(
    "UserController",
    { useClass: UserController }
  );
  const userRepoPrismaRegister = container.register<UserRepositoryPrisma>(
    "UserRepositoryPrisma",
    { useClass: UserRepositoryPrisma }
  );
  const userRepoInterface = container.register<UserRepoInterface>(
    "UserRepoInterface",
    { useClass: UserRepositoryPrisma }
  );

  return {
    userServiceRegister,
    userControllerRegister,
    userRepoPrismaRegister,
    userRepoInterface,
  };
};

export default bootstrapDiRegister;
