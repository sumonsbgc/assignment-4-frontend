import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import { cookies } from "next/headers";
import type { SingleUserAPIResponse, GetUserResponse } from "../types";

export const getUserById = async (id: string): Promise<GetUserResponse> => {
	try {
		const cookieStore = await cookies();

		const res = await api.get<SingleUserAPIResponse>(`/users/${id}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.User],
			},
		});

		if (!res.success || res.error || !res.data?.data) {
			return { user: null };
		}

		return { user: res.data.data };
	} catch (error) {
		console.error("Error fetching user:", error);
		return { user: null };
	}
};
