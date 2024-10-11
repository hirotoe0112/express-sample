import type { User } from "@prisma/client";
import { prisma } from "../prisma-client";

export const getUser = async (id: number): Promise<User | null> => {
	return await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
};

export const getUsers = async (): Promise<User[]> => {
	return await prisma.user.findMany();
};

export const createUser = async (
	user: Pick<User, "email" | "name" | "title">,
): Promise<User> => {
	const new_user = await prisma.user.create({
		data: {
			email: user.email,
			name: user.name,
			title: user.title,
		},
	});
	return new_user;
};

export const testmethod = (): number => {
	return 1;
};
