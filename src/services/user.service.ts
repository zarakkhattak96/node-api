import * as bcrypt from "bcrypt";
import type { userData, UserRepository } from "../domain/user";

type OkResp<T> = {
  status: "ok";
  data: T;
};

type DoesNotExist<T> = {
  status: "doesnt exist";
  error: T;
};

export interface NewUserDto {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
}

export interface UpdatedUserDto {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
}

class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async registerUser({
    name,
    email,
    password,
    phone,
    address,
  }: NewUserDto): Promise<OkResp<userData> | DoesNotExist<string>> {
    const hashedPassword = await bcrypt.hash(password, 10);
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

  async updateUser(
    userObject: userData
  ): Promise<OkResp<userData> | DoesNotExist<string>> {
    try {
      const updatedUser = await this.userRepo.updateUser(userObject);
      return { status: "ok", data: userObject };
    } catch (e) {
      return {
        status: "doesnt exist",
        error: "User Data could not be updated",
      };
    }
  }

  async fetchAll() {
    return this.userRepo.fetchAllUsers();
  }
}

export default UserService;
