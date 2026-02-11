import React from "react";
import type { Metadata } from "next";
import { Header } from "../_partials/Header";
import Footer from "../_partials/Footer";

export const metadata: Metadata = {
	title: {
		default: "Account - MediStore",
		template: "%s - MediStore",
	},
	description: "Login or register to access your MediStore account.",
};

export const dynamic = 'force-dynamic';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default AuthLayout;
