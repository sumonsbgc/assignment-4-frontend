import React from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../ui/navigation-menu";
import { MenuItem } from "@/routes/routes.type";
import Link from "next/link";

const MobileMenus = ({ menus }: { menus: Omit<MenuItem, "icon">[] }) => {
	return (
		Array.isArray(menus) &&
		menus?.length >= 1 &&
		menus?.map((item) => (
			<Link key={item.title} href={item.url} className="text-md font-semibold">
				{item.title}
			</Link>
		))
	);
};

const DesktopMenus = ({ menus }: { menus: Omit<MenuItem, "icon">[] }) => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{Array.isArray(menus) &&
					menus?.length >= 1 &&
					menus?.map((item) => (
						<NavigationMenuItem key={item.title}>
							<NavigationMenuLink
								asChild
								className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
							>
								<Link href={item.url}>{item.title}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

// const renderMenuItem = (item: Omit<MenuItem, "icon">) => {
// 	return (
// 		<NavigationMenuItem key={item.title}>
// 			<NavigationMenuLink
// 				asChild
// 				className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
// 			>
// 				<Link href={item.url}>{item.title}</Link>
// 			</NavigationMenuLink>
// 		</NavigationMenuItem>
// 	);
// };

export { DesktopMenus, MobileMenus };
