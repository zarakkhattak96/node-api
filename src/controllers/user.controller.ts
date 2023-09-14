import type { Request, Response } from "express";
import UserService from "../services/user.service";
import { autoInjectable, inject } from "tsyringe";

@autoInjectable()
export class UserController {
  constructor(
    @inject("UserService") private readonly userService: UserService
  ) {}

  register = async (req: Request, res: Response) => {
    const { name, password, email, phone, address } = req.body;

    for (const val of [name, password, email]) {
      if (val === undefined)
        return res.status(422).json({ message: `Invalid post body` });
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
    const userData = { dataUpdate };
    return res.status(203).json(user);
  };

  fetchAllUsers = async (_req: Request, res: Response) => {
    console.log("8========================)");
    const users = await this.userService.fetchAll();

    return res.status(200).json(users);
  };
}
