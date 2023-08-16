import { Types } from "mongoose";
import { User, UserRepository } from "../../../../domain/user";
import UserModel from "../../models/user.model";

type DBUser = User & { _id: Types.ObjectId; __v: any };

// fetching user data
export class UserRepositoryMongo implements UserRepository {
	private static dbToEnt(db: DBUser) {
		const { __v, _id, ...rest } = db;

		return {
			...rest,
			id: _id.toJSON(),
		};
	}

	fetchAll = async () => {
		const users = await UserModel.find();

		return users.map((u) => UserRepositoryMongo.dbToEnt(u.toJSON()));
	};
	// creating User

	insert = async (userObject: User) => {
		const newUser = await UserModel.create(userObject);
		const userObj = UserRepositoryMongo.dbToEnt(newUser.toJSON());

		return userObj;
	};

	delete = async (id: string) => {
		const user = await UserModel.findByIdAndDelete(id);
		if (user === null) throw new Error("User not defined");
		return user.toJSON();
	};

	fetch = async (id: string) => {
		const user = await UserModel.findById(id);
		if (user === null) return null;

		const domainUser = UserRepositoryMongo.dbToEnt(user.toJSON());
		return domainUser;
	};

	update = async (user: User) => {
		const updateUser = await UserModel.findOneAndUpdate(user);
		if (updateUser === null) throw new Error("User is null");
		return updateUser.toJSON();
	};
}
