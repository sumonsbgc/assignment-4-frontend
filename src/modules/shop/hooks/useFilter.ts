"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MedicineFilters } from "../types";

export const useFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateFilters = useCallback(
		(newFilters: Partial<MedicineFilters>) => {
			const params = new URLSearchParams(searchParams.toString());

			Object.entries(newFilters).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					params.set(key, String(value));
				} else {
					params.delete(key);
				}
			});

			router.push(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams],
	);

	const clearFilters = useCallback(() => {
		router.push("/shop", { scroll: true });
	}, [router]);

	const setPage = useCallback(
		(page: number) => {
			updateFilters({ page });
		},
		[updateFilters],
	);

	return {
		updateFilters,
		clearFilters,
		setPage,
	};
};

export default useFilter;
