import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import ProfileDropdown from "@/components/header/ProfileDropdown";
import AuthMenu from "@/components/header/AuthMenu";
import CartDrawer from "@/components/cart/CartDrawer";

import { NavbarProps } from "@/routes/routes.type";
import { webMenus } from "@/routes/routes";
import { Brand, Logo } from "@/components/header/Logo";
import { DesktopMenus, MobileMenus } from "@/components/header/Menus";
import { getSession } from "@/lib/getSession";
import { IUser } from "@/models/Models";
import { LogOutButton } from "@/components/header/Logout";

const Header = async ({ className }: NavbarProps) => {
	const { menus, auth } = webMenus;
	const { user, isAuthenticated } = await getSession();

	return (
		<header
			className={cn("py-4 border-b sticky top-0 bg-background z-50", className)}
		>
			<div className="container mx-auto px-4">
				<nav className="hidden items-center justify-between lg:flex">
					<div className="flex items-center gap-6">
						<Brand />
						<div className="flex items-center">
							<DesktopMenus menus={menus} />
						</div>
					</div>

					<div className="flex gap-2 items-center">
						{isAuthenticated ? (
							<>
								<CartDrawer />
								<ProfileDropdown user={user as IUser} />
							</>
						) : (
							<AuthMenu auth={auth} />
						)}
					</div>
				</nav>

				{/* Mobile Menu */}
				<div className="block lg:hidden">
					<div className="flex items-center justify-between">
						<Logo />

						<div className="flex gap-2 items-center">
							{isAuthenticated && (
								<>
									<CartDrawer />
									<ProfileDropdown user={user as IUser} />
								</>
							)}

							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline" size="icon">
										<Menu className="size-4" />
									</Button>
								</SheetTrigger>

								<SheetContent className="overflow-y-auto">
									<SheetHeader>
										<SheetTitle>
											<Logo />
										</SheetTitle>
									</SheetHeader>
									<div className="flex flex-col gap-6 p-4">
										<Accordion
											type="single"
											collapsible
											className="flex w-full flex-col gap-4"
										>
											<MobileMenus menus={menus} />
										</Accordion>

										{isAuthenticated ? (
											<div className="flex flex-col gap-3 border-t pt-4">
												<LogOutButton />
											</div>
										) : (
											<AuthMenu auth={auth} />
										)}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export { Header };
