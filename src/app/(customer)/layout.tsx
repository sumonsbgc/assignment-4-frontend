import React from "react";
import { cookies } from "next/headers";

import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "./_partial/partial";

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
	const cookieStore = await cookies();
	const isDefaultOpen = cookieStore.get("sidebar_state")?.value === "true";

	return (
		<SidebarProvider defaultOpen={isDefaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<AdminHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

export default CustomerLayout;
