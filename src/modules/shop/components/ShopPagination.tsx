"use client";

import { Pagination } from "@/modules/shared/components";
import { useFilter } from "../hooks/useFilter";
import type { Pagination as PaginationType } from "../types";

interface ShopPaginationProps {
	pagination: PaginationType;
}

export default function ShopPagination({ pagination }: ShopPaginationProps) {
	const { setPage } = useFilter();
	const { page, totalPages } = pagination;

	return (
		<Pagination
			currentPage={page}
			totalPages={totalPages}
			onPageChange={setPage}
		/>
	);
}
