import { LucideIcon } from "lucide-react";

export type MenuItem = {
	title: string;
	url: string;
	icon: LucideIcon;
};

export interface MenuItems {
	title: string;
	url: string;
	description?: string;
	icon?: React.ReactNode;
	items?: MenuItem[];
}

export interface NavbarProps {
	className?: string;
	logo?: {
		url: string;
		src: string;
		alt: string;
		title: string;
		className?: string;
	};
	menu?: MenuItem[];
	auth?: {
		login: {
			title: string;
			url: string;
		};
		signup: {
			title: string;
			url: string;
		};
	};
}
