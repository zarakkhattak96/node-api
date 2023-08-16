import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	addressAdded: {
		type: Boolean,
		default: false,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: "UserModel",
		// reference to be given the name of the Schema Model created for users
		required: true,
	},
	phone: Number,
	address: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Addresses = mongoose.model("Addresses", addressSchema);

export default Addresses;
