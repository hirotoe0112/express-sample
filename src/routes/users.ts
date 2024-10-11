import { type Request, type Response, Router } from "express";
import { createUser, getUser, getUsers } from "../services/users-service";

export const usersRouter = Router();

// middleware that is specific to this router
usersRouter.use((req: Request, res: Response, next) => {
	console.log("Time: ", Date.now());
	next();
});
// define the home page route
usersRouter.get("/", async (req, res) => {
	const data = await getUsers();
	const response = {
		message: "get users",
		data: data,
	};
	res.send(response);
});
usersRouter.get("/:id", async (req, res) => {
	const userId = req.params.id;
	const data = await getUser(Number(userId));
	if (!data) {
		res.status(404).send("User not found");
	}
	const response = {
		message: "get users",
		data: data,
	};
	res.send(response);
});
usersRouter.post("/", async (req, res) => {
	const body = req.body;
	const data = await createUser(body);
	res.status(201).send(data);
});
