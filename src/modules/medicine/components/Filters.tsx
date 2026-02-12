"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMedicineFilters } from "../hooks/useMedicineFilters";
import type { ICategory } from "@/models/Models";

type FiltersProps = {
	basePath: string;
	categories: ICategory[];
};

export const Filters = ({ basePath, categories }: FiltersProps) => {
	const {
		searchValue,
		setSearchValue,
		currentCategoryId,
		currentStatus,
		handleCategoryChange,
		handleStatusChange,
		handleSortChange,
		currentSortBy,
		currentSortOrder,
	} = useMedicineFilters({ basePath });

	return (
		<div className="flex flex-col md:flex-row gap-4 mt-4">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
				<Input
					placeholder="Search medicines..."
					className="pl-10"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>

			<Select value={currentCategoryId} onValueChange={handleCategoryChange}>
				<SelectTrigger className="w-full md:w-45">
					<SelectValue placeholder="All Categories" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Categories</SelectItem>
					{categories.map((category) => (
						<SelectItem key={category.id} value={category.id}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select value={currentStatus} onValueChange={handleStatusChange}>
				<SelectTrigger className="w-full md:w-36">
					<SelectValue placeholder="All Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Status</SelectItem>
					<SelectItem value="true">Active</SelectItem>
					<SelectItem value="false">Inactive</SelectItem>
				</SelectContent>
			</Select>

			<Select
				value={`${currentSortBy}-${currentSortOrder}`}
				onValueChange={handleSortChange}
			>
				<SelectTrigger className="w-full md:w-45">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="createdAt-desc">Newest First</SelectItem>
					<SelectItem value="createdAt-asc">Oldest First</SelectItem>
					<SelectItem value="price-asc">Price: Low to High</SelectItem>
					<SelectItem value="price-desc">Price: High to Low</SelectItem>
					<SelectItem value="name-asc">Name: A-Z</SelectItem>
					<SelectItem value="name-desc">Name: Z-A</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
