import React from "react";
import { Header } from "../_partials/Header";

const Footer = () => <></>;

const WebLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default WebLayout;
