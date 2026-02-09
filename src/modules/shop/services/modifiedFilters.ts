import { MedicineFilters } from "../types";

export const modifiedFilters = (
	searchParams: Record<string, string | undefined>,
) => {
	console.log(searchParams, "Search Params in modifiedFilters");
	const filters: MedicineFilters = {
		page: searchParams?.page ? parseInt(searchParams.page) : 1,
		limit: 6,
		...(searchParams?.search && { search: searchParams.search }),
		...(searchParams?.categoryId && { categoryId: searchParams.categoryId }),
		...(searchParams?.minPrice && {
			minPrice: parseFloat(searchParams.minPrice),
		}),
		...(searchParams?.maxPrice && {
			maxPrice: parseFloat(searchParams.maxPrice),
		}),
		...(searchParams?.sortBy && { sortBy: searchParams.sortBy }),
	};

	return filters;
};
