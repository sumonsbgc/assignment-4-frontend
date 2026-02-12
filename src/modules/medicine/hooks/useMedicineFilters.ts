"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

type UseMedicineFiltersProps = {
	basePath: string;
};

export const useMedicineFilters = ({ basePath }: UseMedicineFiltersProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentCategoryId = searchParams.get("categoryId") || "all";
	const currentStatus = searchParams.get("isActive") || "all";
	const currentSearch = searchParams.get("search") || "";
	const currentSortBy = searchParams.get("sortBy") || "createdAt";
	const currentSortOrder = searchParams.get("sortOrder") || "desc";

	const [searchValue, setSearchValue] = useState(currentSearch);
	const debouncedSearch = useDebounce(searchValue, 500);

	useEffect(() => {
		if (debouncedSearch === currentSearch) return;

		const params = new URLSearchParams(searchParams.toString());

		if (debouncedSearch) {
			params.set("search", debouncedSearch);
		} else {
			params.delete("search");
		}
		params.set("page", "1");

		router.replace(`${basePath}?${params.toString()}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch, basePath]);

	const handleCategoryChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === "all") {
			params.delete("categoryId");
		} else {
			params.set("categoryId", value);
		}
		params.set("page", "1");

		router.push(`${basePath}?${params.toString()}`);
	};

	const handleStatusChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === "all") {
			params.delete("isActive");
		} else {
			params.set("isActive", value);
		}
		params.set("page", "1");

		router.push(`${basePath}?${params.toString()}`);
	};

	const handleSortChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		const [sortBy, sortOrder] = value.split("-");
		params.set("sortBy", sortBy);
		params.set("sortOrder", sortOrder);
		params.set("page", "1");

		router.push(`${basePath}?${params.toString()}`);
	};

	return {
		searchValue,
		setSearchValue,
		currentCategoryId,
		currentStatus,
		currentSearch,
		currentSortBy,
		currentSortOrder,
		handleCategoryChange,
		handleStatusChange,
		handleSortChange,
	};
};
