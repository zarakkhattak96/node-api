import { container } from "tsyringe";
import UserService from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserRepositoryPrisma } from "./db/repositories";

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

  return {
    userServiceRegister,
    userControllerRegister,
    userRepoPrismaRegister,
  };
};

export default bootstrapDiRegister;
