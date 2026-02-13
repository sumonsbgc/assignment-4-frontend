import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "../_partials/DashboardHeader";
import { getSession } from "@/lib/getSession";
import { Role } from "@/lib/roles";
import { IUser } from "@/models/Models";

export const dynamic = "force-dynamic";

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
	const cookieStore = await cookies();
	const isDefaultOpen = cookieStore.get("sidebar_state")?.value === "true";
	const { isAuthenticated, user } = await getSession();

	if (!isAuthenticated || user?.role !== Role.SELLER) {
		redirect("/login");
	}

	return (
		<SidebarProvider defaultOpen={isDefaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<DashboardHeader user={user as IUser} />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

export default SellerLayout;
