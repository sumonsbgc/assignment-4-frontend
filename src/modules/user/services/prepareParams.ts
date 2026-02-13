import type { UserFilters } from "../types";

type UserSearchParams = {
	page?: string;
	role?: string;
	status?: string;
	search?: string;
	sortBy?: string;
	sortOrder?: string;
};

export const prepareParams = (searchParams: UserSearchParams): UserFilters => {
	const { page, role, status, search, sortBy, sortOrder } = searchParams;
	const pageNumber = page ? parseInt(page, 10) : 1;

	const filterOptions: UserFilters = { page: pageNumber, limit: 10 };

	if (role && role !== "all") {
		filterOptions.role = role;
	}

	if (status && status !== "all") {
		filterOptions.status = status;
	}

	if (search) {
		filterOptions.search = search;
	}

	if (sortBy) {
		filterOptions.sortBy = sortBy as UserFilters["sortBy"];
	}

	if (sortOrder) {
		filterOptions.sortOrder = sortOrder as UserFilters["sortOrder"];
	}

	return filterOptions;
};
