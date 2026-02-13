import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import { cookies } from "next/headers";
import type { UsersAPIResponse, GetUsersResponse, UserFilters } from "../types";

export const getUsers = async (
	options?: UserFilters,
): Promise<GetUsersResponse> => {
	try {
		const cookieStore = await cookies();

		const params = new URLSearchParams();

		if (options?.page !== undefined) {
			params.append("page", options.page.toString());
		}

		if (options?.limit !== undefined) {
			params.append("limit", options.limit.toString());
		}

		if (options?.role) {
			params.append("role", options.role);
		}

		if (options?.status) {
			params.append("status", options.status);
		}

		if (options?.search) {
			params.append("search", options.search);
		}

		if (options?.sortBy) {
			params.append("sortBy", options.sortBy);
		}

		if (options?.sortOrder) {
			params.append("sortOrder", options.sortOrder);
		}

		const queryString = params.toString();
		const url = queryString ? `/users?${queryString}` : "/users";

		const res = await api.get<UsersAPIResponse>(url, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.Users],
				revalidate: 60 * 60 * 24,
			},
		});

		if (!res?.data?.data) {
			return { users: [] };
		}

		const response: GetUsersResponse = {
			users: res.data.data,
		};

		if (res.data.pagination) {
			response.pagination = res.data.pagination;
		}

		return response;
	} catch (error) {
		console.error("Error fetching users:", error);
		return { users: [] };
	}
};
