import {
	FolderTree,
	Home,
	LayoutDashboard,
	Package,
	Settings,
	ShoppingCart,
	Star,
	User,
	Users,
} from "lucide-react";

import { Role } from "@/lib/roles";
import { MenuItem } from "./routes.type";

export const publicRoutes = [
	"/",
	"/login",
	"/register",
	"/shop",
	"/shop/:id",
	"/about",
	"/contact",
	"/cart",
	"/checkout",
];

export const customerRoutes = [
	"/orders",
	"/orders/:id",
	"/profile",
	"/reviews",
];

export const sellerRoutes = [
	"/seller/dashboard",
	"/seller/medicines",
	"/seller/medicines/new",
	"/seller/medicines/:id/edit",
	"/seller/orders",
	"/seller/orders/:id",
	"/seller/profile",
];

export const adminRoutes = [
	"/admin/dashboard",
	"/admin/medicines",
	"/admin/orders",
	"/admin/categories",
	"/admin/orders/:id",
	"/admin/users",
	"/admin/users/:id",
];

const adminMenus: MenuItem[] = [
	{
		title: "Dashboard",
		url: "/admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Users",
		url: "/admin/users",
		icon: Users,
	},
	{
		title: "Categories",
		url: "/admin/categories",
		icon: FolderTree,
	},
	{
		title: "Medicines",
		url: "/admin/medicines",
		icon: Package,
	},
	{
		title: "Orders",
		url: "/admin/orders",
		icon: ShoppingCart,
	},
	{
		title: "Settings",
		url: "/admin/settings",
		icon: Settings,
	},
];

const sellerMenus: MenuItem[] = [
	{
		title: "Dashboard",
		url: "/seller/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Medicines",
		url: "/seller/medicines",
		icon: Package,
	},
	{
		title: "Orders",
		url: "/seller/orders",
		icon: ShoppingCart,
	},
	{
		title: "Profile",
		url: "/seller/profile",
		icon: User,
	},
];

const customerMenus: MenuItem[] = [
	{
		title: "Orders",
		url: "/orders",
		icon: FolderTree,
	},
	{
		title: "Reviews",
		url: "/reviews",
		icon: Star,
	},
	{
		title: "Profile",
		url: "/profile",
		icon: User,
	},
];

export const webMenus = {
	menus: [
		{ title: "Home", url: "/" },
		{
			title: "Shop",
			url: "/shop",
		},
		{
			title: "About",
			url: "/about",
		},
	],
	auth: {
		login: { title: "Login", url: "/login" },
		signup: { title: "Register", url: "/register" },
	},
};

export const getMenusByRole = (role: string): MenuItem[] => {
	switch (role) {
		case Role.ADMIN:
			return adminMenus;
		case Role.SELLER:
			return sellerMenus;
		case Role.CUSTOMER:
		default:
			return customerMenus;
	}
};

export const getRoleMenuItems = (role: string) => {
	switch (role) {
		case Role.ADMIN:
			return [
				{ title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
				{ title: "Users", url: "/admin/users", icon: Users },
				{ title: "Settings", url: "/admin/settings", icon: Settings },
			];
		case Role.SELLER:
			return [
				{ title: "Dashboard", url: "/seller/dashboard", icon: LayoutDashboard },
				{ title: "Medicines", url: "/seller/medicines", icon: Package },
				{ title: "Profile", url: "/seller/profile", icon: User },
			];
		case Role.CUSTOMER:
		default:
			return [
				{ title: "Orders", url: "/orders", icon: FolderTree },
				{ title: "Profile", url: "/profile", icon: User },
			];
	}
};
