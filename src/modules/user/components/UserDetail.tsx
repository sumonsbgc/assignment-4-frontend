import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "../types";
import dayjs from "dayjs";
import { User as UserIcon, Mail, Phone, Calendar, Shield } from "lucide-react";

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

type DetailRowProps = {
	icon: React.ReactNode;
	label: string;
	value: React.ReactNode;
};

const DetailRow = ({ icon, label, value }: DetailRowProps) => (
	<div className="flex gap-3">
		<div className="text-gray-500 flex-shrink-0 mt-0.5">{icon}</div>
		<div>
			<p className="text-sm text-gray-600">{label}</p>
			<p className="font-semibold">{value || "—"}</p>
		</div>
	</div>
);

type UserDetailProps = {
	user: User;
};

export const UserDetail = ({ user }: UserDetailProps) => {
	return (
		<div className="space-y-6">
			{/* Header */}
			<Card>
				<CardHeader>
					<div className="flex justify-between items-start">
						<div>
							<h2 className="text-2xl font-bold mb-1">{user.name}</h2>
							<p className="text-gray-600">{user.email}</p>
						</div>
						<div className="flex gap-2">
							{getRoleBadge(user.role)}
							{getStatusBadge(user.status)}
						</div>
					</div>
				</CardHeader>
			</Card>

			{/* Personal Information */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Personal Information</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<DetailRow
							icon={<UserIcon className="w-5 h-5" />}
							label="Full Name"
							value={user.name}
						/>
						<DetailRow
							icon={<Mail className="w-5 h-5" />}
							label="Email"
							value={
								<span>
									{user.email}
									{user.emailVerified && (
										<span className="ml-2 text-green-600 text-xs">
											(Verified)
										</span>
									)}
								</span>
							}
						/>
						<DetailRow
							icon={<Phone className="w-5 h-5" />}
							label="Phone"
							value={user.phone}
						/>
						<DetailRow
							icon={<Shield className="w-5 h-5" />}
							label="Role"
							value={getRoleBadge(user.role)}
						/>
						<DetailRow
							icon={<Calendar className="w-5 h-5" />}
							label="Joined"
							value={dayjs(user.createdAt).format("MMMM D, YYYY")}
						/>
						<DetailRow
							icon={<Calendar className="w-5 h-5" />}
							label="Last Updated"
							value={dayjs(user.updatedAt).format("MMMM D, YYYY")}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
