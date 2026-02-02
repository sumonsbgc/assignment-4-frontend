"use client";

import {
	Pagination as PaginationRoot,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useFilter } from "../hooks/useFilter";
import type { Pagination as PaginationType } from "../types";

interface PaginationProps {
	pagination: PaginationType;
}

export default function Pagination({ pagination }: PaginationProps) {
	const { setPage } = useFilter();
	const { page, totalPages } = pagination;

	const generatePageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (page <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push("ellipsis");
				pages.push(totalPages);
			} else if (page >= totalPages - 2) {
				pages.push(1);
				pages.push("ellipsis");
				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push("ellipsis");
				for (let i = page - 1; i <= page + 1; i++) pages.push(i);
				pages.push("ellipsis");
				pages.push(totalPages);
			}
		}

		return pages;
	};

	return (
		<div className="mt-8">
			<PaginationRoot>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => page > 1 && setPage(page - 1)}
							className={
								page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
							}
						/>
					</PaginationItem>

					{generatePageNumbers().map((pageNum, index) =>
						pageNum === "ellipsis" ? (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={pageNum}>
								<PaginationLink
									onClick={() => setPage(pageNum as number)}
									isActive={pageNum === page}
									className="cursor-pointer"
								>
									{pageNum}
								</PaginationLink>
							</PaginationItem>
						),
					)}

					<PaginationItem>
						<PaginationNext
							onClick={() => page < totalPages && setPage(page + 1)}
							className={
								page === totalPages
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationRoot>
		</div>
	);
}
