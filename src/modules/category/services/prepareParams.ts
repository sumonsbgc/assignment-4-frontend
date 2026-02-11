import type { CategoryFilters } from "../types";

type CategorySearchParams = {
	page?: string;
	isActive?: string;
	parentId?: string;
	search?: string;
};

export const prepareParams = (
	searchParams: CategorySearchParams,
): CategoryFilters => {
	const { page, isActive, parentId, search } = searchParams;
	const pageNumber = page ? parseInt(page, 10) : 1;

	const filterOptions: CategoryFilters = { page: pageNumber };

	if (isActive !== undefined) {
		filterOptions.isActive = isActive === "true";
	}

	if (parentId !== undefined) {
		filterOptions.parentId = parentId === "null" ? null : parentId;
	}

	if (search) {
		filterOptions.search = search;
	}

	return filterOptions;
};
