"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/auth-client";
import { Button } from "../ui/button";

const Logout = () => {
	const handleLogout = async () => {
		await auth.signOut();
		window.location.href = "/";
	};

	return (
		<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
			<LogOut className="mr-2 h-4 w-4" />
			Logout
		</DropdownMenuItem>
	);
};

const LogOutButton = () => {
	const handleLogout = async () => {
		await auth.signOut();
		window.location.href = "/";
	};

	return (
		<Button variant="outline" onClick={handleLogout} className="justify-start">
			<LogOut className="mr-2 h-4 w-4" />
			Logout
		</Button>
	);
};

export { Logout, LogOutButton };
