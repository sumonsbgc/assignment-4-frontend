"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

type UseUserFiltersProps = {
	basePath: string;
};

export const useUserFilters = ({ basePath }: UseUserFiltersProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentRole = searchParams.get("role") || "all";
	const currentStatus = searchParams.get("status") || "all";
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

		// Reset to page 1 on search
		params.delete("page");

		router.replace(`${basePath}?${params.toString()}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch, basePath]);

	const handleRoleChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === "all") {
			params.delete("role");
		} else {
			params.set("role", value);
		}

		// Reset to page 1 on filter change
		params.delete("page");

		router.push(`${basePath}?${params.toString()}`);
	};

	const handleStatusChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === "all") {
			params.delete("status");
		} else {
			params.set("status", value);
		}

		// Reset to page 1 on filter change
		params.delete("page");

		router.push(`${basePath}?${params.toString()}`);
	};

	return {
		searchValue,
		setSearchValue,
		currentRole,
		currentStatus,
		handleRoleChange,
		handleStatusChange,
	};
};
