import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { User } from "../types";
import { UserAction } from "./UserAction";
import dayjs from "dayjs";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";

const getRoleBadge = (role: string) => {
	switch (role) {
		case "ADMIN":
			return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
		case "SELLER":
			return <Badge className="bg-blue-100 text-blue-800">Seller</Badge>;
		case "CUSTOMER":
			return <Badge className="bg-green-100 text-green-800">Customer</Badge>;
		default:
			return <Badge variant="secondary">{role}</Badge>;
	}
};

const getStatusBadge = (status: string) => {
	switch (status) {
		case "ACTIVE":
			return (
				<Badge className="bg-green-100 text-green-800 border-green-200">
					Active
				</Badge>
			);
		case "SUSPENDED":
			return (
				<Badge className="bg-red-100 text-red-800 border-red-200">
					Suspended
				</Badge>
			);
		case "INACTIVE":
			return (
				<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
					Inactive
				</Badge>
			);
		default:
			return <Badge variant="secondary">{status}</Badge>;
	}
};

export const UserList = ({ users }: { users: User[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Image</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Joined</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.length === 0 ? (
					<TableRow>
						<TableCell colSpan={7} className="text-center py-8 text-gray-500">
							No users found.
						</TableCell>
					</TableRow>
				) : (
					users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
									{user.image ? (
										<Image
											src={user.image}
											alt={user.name}
											fill
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<UserIcon className="w-6 h-6 text-gray-400" />
										</div>
									)}
								</div>
							</TableCell>
							<TableCell className="font-medium">
								<div>
									<div>{user.name}</div>
									{user.phone && (
										<div className="text-xs text-muted-foreground">
											{user.phone}
										</div>
									)}
								</div>
							</TableCell>
							<TableCell>
								<div className="text-sm">
									{user.email}
									{user.emailVerified && (
										<span
											className="ml-1 text-green-600"
											title="Email Verified"
										>
											✓
										</span>
									)}
								</div>
							</TableCell>
							<TableCell>{getRoleBadge(user.role)}</TableCell>
							<TableCell>{getStatusBadge(user.status)}</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								{dayjs(user.createdAt).format("MMM D, YYYY")}
							</TableCell>
							<TableCell className="text-right">
								<UserAction user={user} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
