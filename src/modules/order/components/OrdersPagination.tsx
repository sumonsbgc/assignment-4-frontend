"use client";

import { Pagination } from "@/modules/shared/components";
import { useRouter, useSearchParams } from "next/navigation";

interface OrdersPaginationProps {
	pagination: {
		page: number;
		totalPages: number;
	};
}

export default function OrdersPagination({
	pagination,
}: OrdersPaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { page, totalPages } = pagination;

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`/orders?${params.toString()}`);
	};

	return (
		<Pagination
			currentPage={page}
			totalPages={totalPages}
			onPageChange={handlePageChange}
		/>
	);
}
