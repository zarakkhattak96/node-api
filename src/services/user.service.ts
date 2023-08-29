import bcrypt from "bcrypt";
import type { User, UserRepository } from "../domain/user";

type OkResp<T> = {
	status: "ok";
	data: T;
};

type DoesNotExist<T> = {
	status: "doesntexist";
	error: T;
};

export interface NewUserDto {
	name: string;
	email: string;
	password: string;
	phone: number;
	address: string;
}

export interface UpdateDto {
	id: string;
	name: string;
	email: string;
	phone: number;
	address: string;
}
// export interface DeleteUserDto{
// 	id: string
// }

class UserService {
	constructor(private readonly userRepo: UserRepository) {}

	async registerUser({
		name,
		email,
		password,
		phone,
		address,
	}: NewUserDto): Promise<OkResp<User> | DoesNotExist<string>> {
		// password hashings
		const hashedPassword = await bcrypt.hash(password, 10);
		const user: User = {
			name,
			email,
			password: hashedPassword,
			phone,
			address,
			createdAt: new Date(),
		};
		try {
			const insertedUser = await this.userRepo.insert(user);

			return { status: "ok", data: insertedUser };
		} catch (e) {
			return { status: "doesntexist", error: "User Already Exists" };
		}
	}

	async deleteUser(
		id: string,
	): Promise<OkResp<string> | DoesNotExist<string>> {
		try {
			await this.userRepo.delete(id);
			return { status: "ok", data: "deletedUser" };
		} catch (e) {
			return { status: "doesntexist", error: "User is not deleted" };
		}
	}

	async updateUser(user: User): Promise<OkResp<User> | DoesNotExist<string>> {
		try {
			const updatedUser = await this.userRepo.update(user);
			return { status: "ok", data: updatedUser };
		} catch (e) {
			return { status: "doesntexist", error: "User not updated" };
		}
	}

	async fetchUser(
		id: string,
	): Promise<OkResp<User | null> | DoesNotExist<string>> {
		const user = await this.userRepo.fetch(id);
		if (user === null) {
			return { status: "doesntexist", error: `User with id <${id}> not found` };
		} else {
			return { status: "ok", data: user };
		}
	}

	async fetchAllUsers() {
		return this.userRepo.fetchAll();
	}
}

// hashPassword = async () => {
// 	const hashUser = await bcrypt.hash(password, 10);

// 	const hashedUser = await this.userRepo.insert({
// 		name,
// 		password: hashUser,
// 		email,
// 		address,
// 		phone,
// 	});

// 	const token = jwt.sign(
// 		{ _id: hashedUser._id },
// 		`${process.env.JWT_SECRET}`,
// 	);

// 	res
// 		.status(201)
// 		.cookie("token", token, {
// 			httpOnly: true,
// 			maxAge: 10 * 60 * 1000,
// 			// cookie will expire after 10 minutes
// 		})
// 		.json({ success: true, message: "User Created" });
// };

export default UserService;
