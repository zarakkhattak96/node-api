import mongoose from "mongoose";
import type { User } from "../../../domain/user";

const UserSchema = new mongoose.Schema<User>({
	name: { type: String, required: true },
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		select: false,
		required: false,
	},
	phone: Number,
	address: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
