"use client";

import { Pagination } from "@/modules/shared/components";
import { useRouter, useSearchParams } from "next/navigation";

interface UserPaginationProps {
	pagination: {
		page: number;
		totalPages: number;
	};
	basePath: string;
}

export const UserPagination = ({
	pagination,
	basePath,
}: UserPaginationProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { page, totalPages } = pagination;

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`${basePath}?${params.toString()}`);
	};

	return (
		<Pagination
			currentPage={page}
			totalPages={totalPages}
			onPageChange={handlePageChange}
		/>
	);
};
