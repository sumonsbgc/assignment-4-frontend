"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type {
	UpdateUserBody,
	UpdateUserResponse,
	SingleUserAPIResponse,
} from "../types";

export const updateUser = async (
	userId: string,
	userData: UpdateUserBody,
): Promise<UpdateUserResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.put<SingleUserAPIResponse>(
			`/users/${userId}`,
			userData,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error || !res.data?.data) {
			return {
				status: false,
				message: res.error || "Failed to update user",
				data: null,
			};
		}

		updateTag(CacheTags.Users);
		updateTag(CacheTags.User);

		return {
			status: true,
			message: "User updated successfully",
			data: res.data.data,
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Failed to update user",
			data: null,
		};
	}
};
