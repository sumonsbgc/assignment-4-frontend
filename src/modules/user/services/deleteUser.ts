"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type { DeleteUserResponse } from "../types";

export const deleteUser = async (
	userId: string,
): Promise<DeleteUserResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.delete<{ success: boolean; message?: string }>(
			`/users/${userId}`,
			undefined,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to delete user",
			};
		}

		updateTag(CacheTags.Users);

		return {
			status: true,
			message: "User deleted successfully",
		};
	} catch (error) {
		console.error("Error deleting user:", error);
		return {
			status: false,
			message: error instanceof Error ? error.message : "Failed to delete user",
		};
	}
};
