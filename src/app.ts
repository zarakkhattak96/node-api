import express, { Request, Response } from "express";
import config from "./infra/config";
import { bootstrapDi } from "./infra/di";
import { connectDb } from "./infra/db/conn";
import { bootstrapUserRoutes } from "./routes/usersRoutes";
import cors from "cors";

const bootstrap = async () => {
	await connectDb();

	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());

	const diContainer = bootstrapDi();
	const userRouter = bootstrapUserRoutes(diContainer.userController);

	// using routes
	app.use("/api/v1/users", userRouter);

	const PORT = config.PORT;

	app.listen(PORT, () => {
		console.log(`App is live at ${PORT}`);
	});
};

bootstrap();
