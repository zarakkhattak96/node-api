import argon2 from "argon2";
import { userEntity } from "../../domain/entities/user.entity";
// import { UserPort } from "../../domain/repositories/user.port";
import { autoInjectable, inject } from "tsyringe";
import {
  CreateUserDto,
  UpdateUserDto,
  DeleteUserDto,
} from "../dtos/crudUser.dto";
import { UserRepoInterface } from "../../infra/db/repositories/users/user.repo.interface";

type OkResp<T> = {
  status: "ok";
  data: T;
};

type DoesNotExist<T> = {
  status: "doesnt exist";
  error: T;
};

@autoInjectable()
class UserService {
  constructor(
    @inject("UserRepoInterface")
    private readonly userPort: UserRepoInterface
  ) {}
  async createdUser({
    name,
    email,
    password,
    phone,
    address,
  }: CreateUserDto): Promise<OkResp<userEntity> | DoesNotExist<string>> {
    try {
      const hashedPassword = await argon2.hash("password");
      const user: userEntity = {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        createdAt: new Date(),
      };
      const insertedUser = await this.userPort.registerUser(user);
      return { status: "ok", data: insertedUser };
    } catch (e) {
      return { status: "doesnt exist", error: "User Already Exists" };
    }
  }

  async delete(
    userObject: DeleteUserDto
  ): Promise<OkResp<userEntity> | DoesNotExist<string>> {
    try {
      const deletedUser = await this.userPort.deleteUser(userObject);
      return { status: "ok", data: deletedUser };
    } catch (e) {
      return { status: "doesnt exist", error: "Record to delete not found" };
    }
  }

  async updateUser({
    name,
    email,
    phone,
    address,
    password,
  }: UpdateUserDto): Promise<OkResp<userEntity> | DoesNotExist<string>> {
    try {
      const hashedPassword = await argon2.hash("password");

      const updatedUserWithHash = {
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      };
      const updatedUser = await this.userPort.updateUser(updatedUserWithHash);
      const hashedUser = await argon2.verify(hashedPassword, "password");
      if (hashedUser) {
        console.log("Passwords Match: User Record Updated");
        return { status: "ok", data: updatedUser };
      } else {
        console.log("Passwords do not match");
      }
    } catch (e) {
      console.log("User Record Cannot Be Updated");
    }
    return { status: "doesnt exist", error: "Record to update not found" };
  }

  async getAllUsers() {
    const allUsers = await this.userPort.getAllUsers();
    return allUsers;
  }
}

export default UserService;
