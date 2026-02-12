import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import { cookies } from "next/headers";
import type { UsersAPIResponse, GetUsersResponse, UserFilters } from "../types";

export const getUsers = async (
	options?: UserFilters,
): Promise<GetUsersResponse> => {
	try {
		const cookieStore = await cookies();

		const params: Record<string, string> = {};

		if (options?.role) {
			params.role = options.role;
		}

		const res = await api.get<UsersAPIResponse>("/users", {
			headers: {
				Cookie: cookieStore.toString(),
			},
			params,
			next: {
				tags: [CacheTags.Users],
			},
		});

		if (!res.success || res.error || !res.data?.data) {
			return { users: [] };
		}

		let users = res.data.data;

		// Client-side search filter (backend doesn't support search query)
		if (options?.search) {
			const search = options.search.toLowerCase();
			users = users.filter(
				(user) =>
					user.name.toLowerCase().includes(search) ||
					user.email.toLowerCase().includes(search),
			);
		}

		return { users };
	} catch (error) {
		console.error("Error fetching users:", error);
		return { users: [] };
	}
};
