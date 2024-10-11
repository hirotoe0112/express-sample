import { prisma } from "../prisma-client";
import { createUser, getUser, getUsers, testmethod } from "./users-service";

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;
});

describe("testmethod", () => {
	test("テスト", () => {
		expect(testmethod()).toBe(1);
	});
});

describe("getUsers", () => {
	test("ユーザ一覧が取得できること", async () => {
		const data = [
			{
				email: "test1@example.com",
				name: "test1",
				title: "title1",
			},
			{
				email: "test2@example.com",
				name: "test2",
				title: "title2",
			},
		];
		await prisma.user.createMany({
			data: data,
		});
		expect(await getUsers()).toMatchObject(data);
	});
	test("テーブルが空の場合にエラーにならないこと", async () => {
		expect(await getUsers()).toMatchObject([]);
	});
});

describe("getUser", () => {
	test("ユーザーを指定して取得できること", async () => {
		const data = [
			{
				email: "test1@example.com",
				name: "test1",
				title: "title1",
			},
			{
				email: "test2@example.com",
				name: "test2",
				title: "title2",
			},
		];
		await prisma.user.createMany({
			data: data,
		});
		const users = await getUsers();
		expect(await getUser(users[0].id)).toMatchObject(users[0]);
	});
	test("ユーザーが存在しない場合にエラーにならないこと", async () => {
		expect(await getUser(-1)).toBeNull();
	});
});

describe("createUser", () => {
	test("ユーザーを作成できること", async () => {
		const data = {
			email: "test@example.com",
			name: "aaa",
			title: "bbb",
		};
		expect(await createUser(data)).toMatchObject(data);
	});
});
