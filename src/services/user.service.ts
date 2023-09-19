import argon2 from "argon2";
import { userData, UserRepository } from "../domain/user";
import { autoInjectable, inject } from "tsyringe";
import { CreateUserDto, UpdateUserDto } from "../validation/user.validation";

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
    @inject("UserRepositoryPrisma")
    private readonly userRepo: UserRepository
  ) {}
  async registerUser({
    name,
    email,
    password,
    phone,
    address,
  }: CreateUserDto): Promise<OkResp<userData> | DoesNotExist<string>> {
    const hashedPassword = await argon2.hash("password");
    const user: userData = {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      createdAt: new Date(),
    };
    try {
      const insertedUser = await this.userRepo.registerUser(user);
      return { status: "ok", data: insertedUser };
    } catch (e) {
      return { status: "doesnt exist", error: "User Already Exists" };
    }
  }

  async delete(
    userObject: userData
  ): Promise<OkResp<userData> | DoesNotExist<string>> {
    try {
      const deletedUser = await this.userRepo.deleteUser(userObject);
      return { status: "ok", data: deletedUser };
    } catch (e) {
      return { status: "doesnt exist", error: "User is not deleted" };
    }
  }

  async updateUser({
    name,
    email,
    phone,
    address,
    password,
  }: UpdateUserDto): Promise<OkResp<userData> | DoesNotExist<string>> {
    try {
      const hashedPassword = await argon2.hash("password");

      const updatedUserWithHash = {
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      };
      const updatedUser = await this.userRepo.updateUser(updatedUserWithHash);
      console.log(updatedUser);
      const hashedUser = await argon2.verify(hashedPassword, "password");
      if (hashedUser) {
        console.log("Passwords Match");
        return { status: "ok", data: updatedUser };
      } else {
        console.log("Passwords do not match");
      }
    } catch (e) {
      console.log(e);
    }
    return { status: "doesnt exist", error: "HEHEHHE" };
  }

  async fetchAll() {
    return this.userRepo.fetchAllUsers();
  }
}

export default UserService;
