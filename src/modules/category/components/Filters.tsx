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
import { useCategoryFilters } from "../hooks/useCategoryFilters";

type FiltersProps = {
	basePath: string;
};

export const Filters = ({ basePath }: FiltersProps) => {
	const {
		searchValue,
		setSearchValue,
		currentStatus,
		currentParentFilter,
		handleStatusChange,
		handleParentFilterChange,
	} = useCategoryFilters({ basePath });

	return (
		<div className="flex flex-col md:flex-row gap-4 mt-4">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
				<Input
					placeholder="Search categories..."
					className="pl-10"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>

			<Select value={currentStatus} onValueChange={handleStatusChange}>
				<SelectTrigger className="w-full md:w-45">
					<SelectValue placeholder="Filter by status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Status</SelectItem>
					<SelectItem value="true">Active</SelectItem>
					<SelectItem value="false">Inactive</SelectItem>
				</SelectContent>
			</Select>

			<Select
				value={currentParentFilter}
				onValueChange={handleParentFilterChange}
			>
				<SelectTrigger className="w-full md:w-45">
					<SelectValue placeholder="Filter by level" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Levels</SelectItem>
					<SelectItem value="null">Top-level Only</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
