import type { UserFilters } from "../types";

type UserSearchParams = {
	role?: string;
	search?: string;
};

export const prepareParams = (searchParams: UserSearchParams): UserFilters => {
	const { role, search } = searchParams;
	const filterOptions: UserFilters = {};

	if (role && role !== "all") {
		filterOptions.role = role;
	}

	if (search) {
		filterOptions.search = search;
	}

	return filterOptions;
};
