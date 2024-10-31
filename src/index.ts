import path from "node:path";
import dotenv from "dotenv";
import express, {
	type Express,
	type Request,
	type Response,
	type ErrorRequestHandler,
} from "express";
import * as OpenApiValidator from "express-openapi-validator";
import { prisma } from "./prisma-client";
import { birdsRouter } from "./routes/birds";
import { usersRouter } from "./routes/users";
dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("This is a root path 2");
});

// ミドルウェア
app.use(express.json());
app.use(
	OpenApiValidator.middleware({
		apiSpec: path.join(__dirname, "docs/openapi.yaml"),
		validateRequests: true, // (default)
		validateResponses: true, // false by default
	}),
);

// ルーター
app.use("/users", usersRouter);
app.use("/birds", birdsRouter);

// エラーハンドリング
app.use(((err, req, res, next) => {
	// format error
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
}) as ErrorRequestHandler);

const server = app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

const shutdownPrisma = async () => {
	await prisma.$disconnect();
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
};

process.on("SIGTERM", shutdownPrisma);
process.on("SIGINT", shutdownPrisma);
