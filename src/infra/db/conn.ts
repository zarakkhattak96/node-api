import mongoose from "mongoose";
import config from "../config";

export const connectDb = async () =>
	mongoose
		.connect(config.DB_URL, {
			dbName: "userData",
		})
		.then(() => console.log("Database Connected"))
		.catch((e) => console.log(e));
