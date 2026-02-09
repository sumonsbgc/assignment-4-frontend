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

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PaginationProps) {
	const generatePageNumbers = () => {
		const pages: (number | "ellipsis")[] = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push("ellipsis");
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1);
				pages.push("ellipsis");
				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push("ellipsis");
				for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
				pages.push("ellipsis");
				pages.push(totalPages);
			}
		}

		return pages;
	};

	if (totalPages <= 1) return null;

	const pageNumbers = generatePageNumbers();

	return (
		<div className={className || "mt-8"}>
			<PaginationRoot>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
							className={
								currentPage === 1
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>

					{pageNumbers.map((pageNum, index) =>
						pageNum === "ellipsis" ? (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={pageNum}>
								<PaginationLink
									onClick={() => onPageChange(pageNum)}
									isActive={pageNum === currentPage}
									className="cursor-pointer"
								>
									{pageNum}
								</PaginationLink>
							</PaginationItem>
						),
					)}

					<PaginationItem>
						<PaginationNext
							onClick={() =>
								currentPage < totalPages && onPageChange(currentPage + 1)
							}
							className={
								currentPage === totalPages
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

export default Pagination;
