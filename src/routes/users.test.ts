import request from "supertest";
import { app } from "../index";
import { prisma } from "../prisma-client";

beforeAll(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;
});

describe("GET /users", () => {
	test("ユーザ一覧が取得できること", async () => {
		const response = await request(app).get("/users");
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({
			message: "get users",
			data: [],
		});
	});
});
