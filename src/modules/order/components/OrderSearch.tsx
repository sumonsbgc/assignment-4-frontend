"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

type OrderSearchProps = {
	basePath: string;
};

export function OrderSearch({ basePath }: OrderSearchProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentSearch = searchParams.get("search") || "";
	const [searchValue, setSearchValue] = useState(currentSearch);
	const debouncedSearch = useDebounce(searchValue, 400);

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (debouncedSearch) {
			params.set("search", debouncedSearch);
		} else {
			params.delete("search");
		}

		params.set("page", "1");
		router.push(`${basePath}?${params.toString()}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch]);

	return (
		<div className="relative flex-1">
			<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
			<Input
				placeholder="Search by order number or customer name..."
				className="pl-10"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	);
}
