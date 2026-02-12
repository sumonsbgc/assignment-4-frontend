"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "../types";
import dayjs from "dayjs";

type ProfileSidebarProps = {
	user: User;
};

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

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
	const initials = user.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "?";

	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex flex-col items-center text-center">
					<Avatar className="w-24 h-24 mb-4">
						{user.image && <AvatarImage src={user.image} alt={user.name} />}
						<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
							{initials}
						</AvatarFallback>
					</Avatar>
					<h2 className="text-xl font-semibold mb-1">{user.name}</h2>
					<p className="text-sm text-gray-600 mb-2">{user.email}</p>
					<div className="mb-2">{getRoleBadge(user.role)}</div>
					{user.phone && (
						<p className="text-sm text-gray-500 mb-2">{user.phone}</p>
					)}
					<p className="text-xs text-gray-400">
						Member since {dayjs(user.createdAt).format("MMM YYYY")}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
