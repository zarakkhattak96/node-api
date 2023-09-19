import type { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { autoInjectable, inject } from "tsyringe";
import { CreateUserDto } from "../validation/user.validation";

@autoInjectable()
export class UserController {
  constructor(
    @inject("UserService") private readonly userService: UserService
  ) {}

  register = async (req: Request, res: Response) => {
    const { name, password, email, phone, address } = req.body;

    for (const val of [name, password, email]) {
      if (val === undefined) return console.log("Invalid Post Body");
    }
    const result = await this.userService.registerUser({
      name,
      email,
      password,
      phone,
      address,
    });
    if (result.status === "ok") {
      return res.status(201).json(result.data);
    }

    return res.status(404).json({ error: result.error });
  };

  delete = async (req: Request, res: Response) => {
    const deleteUser = await this.userService.delete(req.body);
    return res.status(200).json(deleteUser);
  };

  update = async (req: Request, res: Response) => {
    const dataUpdate = req.body;
    const user = await this.userService.updateUser(dataUpdate);
    return res.status(203).json(user);
  };

  fetchAllUsers = async (_req: Request, res: Response) => {
    const users = await this.userService.fetchAll();

    return res.status(200).json(users);
  };
}
