"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/modules/shared/components";

type SellerOrdersPaginationProps = {
	pagination: {
		page: number;
		totalPages: number;
	};
};

export function SellerOrdersPagination({
	pagination,
}: SellerOrdersPaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`/seller/orders?${params.toString()}`);
	};

	return (
		<Pagination
			currentPage={pagination.page}
			totalPages={pagination.totalPages}
			onPageChange={handlePageChange}
		/>
	);
}
