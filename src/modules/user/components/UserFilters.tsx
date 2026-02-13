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
import { useUserFilters } from "../hooks/useUserFilters";

type UserFiltersProps = {
	basePath: string;
};

export const UserFilters = ({ basePath }: UserFiltersProps) => {
	const {
		searchValue,
		setSearchValue,
		currentRole,
		currentStatus,
		handleRoleChange,
		handleStatusChange,
	} = useUserFilters({ basePath });

	return (
		<div className="flex flex-col md:flex-row gap-4 mt-4">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
				<Input
					placeholder="Search users by name or email..."
					className="pl-10"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>

			<Select value={currentRole} onValueChange={handleRoleChange}>
				<SelectTrigger className="w-full md:w-[180px]">
					<SelectValue placeholder="All Roles" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Roles</SelectItem>
					<SelectItem value="ADMIN">Admin</SelectItem>
					<SelectItem value="SELLER">Seller</SelectItem>
					<SelectItem value="CUSTOMER">Customer</SelectItem>
				</SelectContent>
			</Select>

			<Select value={currentStatus} onValueChange={handleStatusChange}>
				<SelectTrigger className="w-full md:w-[180px]">
					<SelectValue placeholder="All Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Status</SelectItem>
					<SelectItem value="ACTIVE">Active</SelectItem>
					<SelectItem value="INACTIVE">Inactive</SelectItem>
					<SelectItem value="SUSPENDED">Suspended</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
