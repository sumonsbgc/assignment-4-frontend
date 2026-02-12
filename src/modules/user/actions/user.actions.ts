"use server";

import { updateUser } from "../services/updateUser";
import { deleteUser } from "../services/deleteUser";
import type { UserStatus } from "../types";
import type { Role } from "@/lib/roles";

export const updateUserStatusAction = async (
	userId: string,
	status: UserStatus,
) => {
	const result = await updateUser(userId, { status });
	return {
		success: result.status,
		message: result.message,
	};
};

export const updateUserRoleAction = async (userId: string, role: Role) => {
	const result = await updateUser(userId, { role });
	return {
		success: result.status,
		message: result.message,
	};
};

export const deleteUserAction = async (userId: string) => {
	const result = await deleteUser(userId);
	return {
		success: result.status,
		message: result.message,
	};
};
