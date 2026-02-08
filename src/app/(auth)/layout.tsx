import React from "react";
import { Header } from "../_partials/Header";
import Footer from "../_partials/Footer";

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
