import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import type { SingleUserAPIResponse, GetUserResponse } from "../types";

export const getMyProfile = async (): Promise<GetUserResponse> => {
	try {
		const cookieStore = await cookies();

		const res = await api.get<SingleUserAPIResponse>("/users/me", {
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
		console.error("Error fetching profile:", error);
		return { user: null };
	}
};
