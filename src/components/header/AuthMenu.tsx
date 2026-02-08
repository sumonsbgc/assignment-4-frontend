import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { NavbarProps } from "@/routes/routes.type";

const AuthMenu = ({ auth }: { auth: NavbarProps["auth"] }) => {
	if (!auth) return null;

	return (
		<div className="flex gap-4 sm">
			<Button asChild variant="outline">
				<Link href={auth.login.url}>{auth.login.title}</Link>
			</Button>
			<Button asChild>
				<Link href={auth.signup.url}>{auth.signup.title}</Link>
			</Button>
		</div>
	);
};

export default AuthMenu;
