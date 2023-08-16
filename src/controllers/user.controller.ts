import type { Request, Response } from "express";
import UserService, { UpdateDto } from "../services/user.service";

export class UserController {
	constructor(private readonly userService: UserService) {}

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
		const { id } = req.params;
		const deleteUser = await this.userService.deleteUser(id);
		return res.status(200).json(deleteUser);
	};

	update = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { name, email, password, address, phone } = req.body;
		// const user = await this.userService.fetchUser(id);
		const updateUser = await this.userService.updateUser({
			name,
			email,
			address,
			phone,
			password,
		});

		return res.status(203).json(updateUser);
	};

	fetch = async (req: Request, res: Response) => {
		const { id } = req.params;

		const fetchUser = await this.userService.fetchUser(id);
		if(fetchUser.status === 'ok'){
			return res.status(200).json(fetchUser);
		}

		return res.status(404).json({message: fetchUser.error})
	};

	fetchAllUsers = async (_req: Request, res: Response) => {
		const users = await this.userService.fetchAllUsers();

		return res.status(200).json(users);
	};
}


