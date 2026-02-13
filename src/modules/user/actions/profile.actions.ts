"use server";

import { updateUser } from "../services/updateUser";
import type { UpdateUserBody } from "../types";

export type UpdateProfileData = Pick<
	UpdateUserBody,
	"name" | "email" | "phone" | "image"
>;

export const updateProfileAction = async (
	userId: string,
	data: UpdateProfileData,
) => {
	const result = await updateUser(userId, data);
	return {
		success: result.status,
		message: result.message,
		data: result.data,
	};
};
