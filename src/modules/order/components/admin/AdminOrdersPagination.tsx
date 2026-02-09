"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination as SharedPagination } from "@/modules/shared/components";

type AdminOrdersPaginationProps = {
	pagination: {
		page: number;
		totalPages: number;
	};
};

export function AdminOrdersPagination({
	pagination,
}: AdminOrdersPaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`/admin/orders?${params.toString()}`);
	};

	return (
		<SharedPagination
			currentPage={pagination.page}
			totalPages={pagination.totalPages}
			onPageChange={handlePageChange}
		/>
	);
}
