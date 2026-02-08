"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Search,
	MoreVertical,
	Eye,
	UserX,
	Shield,
	ShieldOff,
} from "lucide-react";
import Link from "next/link";

export default function AdminUsersPage() {
	// Mock users data - replace with actual data from API
	const users = [
		{
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			role: "customer",
			status: "active",
			joinDate: "2026-01-15",
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane.smith@example.com",
			role: "customer",
			status: "active",
			joinDate: "2026-01-18",
		},
		{
			id: 3,
			name: "MediCare Pharmacy",
			email: "seller@medicare.com",
			role: "seller",
			status: "active",
			joinDate: "2026-01-10",
		},
		{
			id: 4,
			name: "HealthPlus Store",
			email: "seller@healthplus.com",
			role: "seller",
			status: "active",
			joinDate: "2026-01-12",
		},
		{
			id: 5,
			name: "Bob Johnson",
			email: "bob.j@example.com",
			role: "customer",
			status: "suspended",
			joinDate: "2026-01-20",
		},
	];

	const getRoleBadge = (role: string) => {
		switch (role) {
			case "admin":
				return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
			case "seller":
				return <Badge className="bg-blue-100 text-blue-800">Seller</Badge>;
			case "customer":
				return <Badge className="bg-green-100 text-green-800">Customer</Badge>;
			default:
				return <Badge>{role}</Badge>;
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return <Badge className="bg-green-100 text-green-800">Active</Badge>;
			case "suspended":
				return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
			case "pending":
				return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
			default:
				return <Badge>{status}</Badge>;
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Users</h1>
					<p className="text-gray-600">Manage all platform users</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input placeholder="Search users..." className="pl-10" />
						</div>
						<Select defaultValue="all">
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Roles</SelectItem>
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="seller">Seller</SelectItem>
								<SelectItem value="customer">Customer</SelectItem>
							</SelectContent>
						</Select>
						<Select defaultValue="all">
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="suspended">Suspended</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Join Date</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="font-medium">{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{getRoleBadge(user.role)}</TableCell>
									<TableCell>{getStatusBadge(user.status)}</TableCell>
									<TableCell>
										{new Date(user.joinDate).toLocaleDateString()}
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreVertical className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link href={`/admin/users/${user.id}`}>
														<Eye className="w-4 h-4 mr-2" />
														View Details
													</Link>
												</DropdownMenuItem>
												{user.status === "active" && (
													<DropdownMenuItem className="text-yellow-600">
														<ShieldOff className="w-4 h-4 mr-2" />
														Suspend Account
													</DropdownMenuItem>
												)}
												{user.status === "suspended" && (
													<DropdownMenuItem className="text-green-600">
														<Shield className="w-4 h-4 mr-2" />
														Activate Account
													</DropdownMenuItem>
												)}
												<DropdownMenuItem className="text-red-600">
													<UserX className="w-4 h-4 mr-2" />
													Delete Account
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
