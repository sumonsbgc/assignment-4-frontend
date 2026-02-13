"use server";

import { updateMyProfile } from "../services/updateMyProfile";
import type { UpdateUserBody } from "../types";

export type UpdateProfileData = Pick<
	UpdateUserBody,
	"name" | "email" | "phone" | "image"
>;

export const updateProfileAction = async (
	userId: string,
	data: UpdateProfileData,
) => {
	const result = await updateMyProfile(data);
	return {
		success: result.status,
		message: result.message,
		data: result.data,
	};
};
