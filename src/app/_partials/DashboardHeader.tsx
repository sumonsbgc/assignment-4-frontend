import DashboardBreadcrumb from "@/components/header/DashboardBreadcrumb";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import ProfileDropdown from "@/components/header/ProfileDropdown";
import { IUser } from "@/models/Models";

export const DashboardHeader = async ({ user }: { user: IUser }) => {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1" />
			<Separator
				orientation="vertical"
				className="mr-2 data-[orientation=vertical]:h-4"
			/>

			<DashboardBreadcrumb />

			<div className="ml-auto flex items-center gap-2">
				<ProfileDropdown user={user} />
			</div>
		</header>
	);
};

// export const DashboardFooter = () => <footer>Footer</footer>;
