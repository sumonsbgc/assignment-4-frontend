import type { MedicineFilters } from "../types";

type MedicineSearchParams = {
	page?: string;
	search?: string;
	categoryId?: string;
	isActive?: string;
	sortBy?: string;
	sortOrder?: string;
};

export const prepareParams = (
	searchParams: MedicineSearchParams,
): MedicineFilters => {
	const { page, search, categoryId, isActive, sortBy, sortOrder } =
		searchParams;
	const pageNumber = page ? parseInt(page, 10) : 1;

	const filterOptions: MedicineFilters = { page: pageNumber };

	if (search) {
		filterOptions.search = search;
	}

	if (categoryId) {
		filterOptions.categoryId = categoryId;
	}

	if (isActive !== undefined) {
		filterOptions.isActive = isActive === "true";
	}

	if (sortBy) {
		filterOptions.sortBy = sortBy as MedicineFilters["sortBy"];
	}

	if (sortOrder) {
		filterOptions.sortOrder = sortOrder as MedicineFilters["sortOrder"];
	}

	return filterOptions;
};
