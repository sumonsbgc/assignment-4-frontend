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

		router.push(`${basePath}?${params.toString()}`);
	};

	return {
		searchValue,
		setSearchValue,
		currentRole,
		handleRoleChange,
	};
};
