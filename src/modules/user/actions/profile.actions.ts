"use server";

import { updateMyProfile } from "../services/updateMyProfile";
import { updateUser } from "../services/updateUser";
import type { UpdateUserBody } from "../types";

export type UpdateProfileData = Pick<
	UpdateUserBody,
	"name" | "email" | "phone" | "image"
>;

/**
 * Update the currently authenticated user's own profile (PUT /users/me)
 */
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

/**
 * Admin updates another user's profile (PUT /users/:id)
 */
export const adminUpdateUserProfileAction = async (
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
