"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

type UseCategoryFiltersProps = {
	basePath: string;
};

export const useCategoryFilters = ({ basePath }: UseCategoryFiltersProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentStatus = searchParams.get("isActive") || "all";
	const currentParentFilter = searchParams.get("parentId") || "all";
	const currentSearch = searchParams.get("search") || "";

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

	const handleParentFilterChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === "all") {
			params.delete("parentId");
		} else {
			params.set("parentId", value);
		}
		params.set("page", "1");

		router.push(`${basePath}?${params.toString()}`);
	};

	return {
		searchValue,
		setSearchValue,
		currentStatus,
		currentParentFilter,
		currentSearch,
		handleStatusChange,
		handleParentFilterChange,
	};
};
