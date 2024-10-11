import { type Request, type Response, Router } from "express";
import { getBirdsInfo } from "../services/birds-service";

export const birdsRouter = Router();

// middleware that is specific to this router
birdsRouter.use((req: Request, res: Response, next) => {
	console.log("Time: ", Date.now());
	next();
});
// define the home page route
birdsRouter.get("/", (req, res) => {
	const data = getBirdsInfo("Birds home page");
	res.send(data);
});
// define the about route
birdsRouter.get("/about", (req, res) => {
	res.send("About birds");
});
