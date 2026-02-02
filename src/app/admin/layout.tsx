import React from "react";
import { cookies } from "next/headers";

import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "./_partial/partial";
import { auth } from "@/lib/auth-client";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const cookieStore = await cookies();
	const isDefaultOpen = cookieStore.get("sidebar_state")?.value === "true";

	const session = await auth.getSession();

	if (!session) {
		throw new Error("Unauthorized");
	}

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

export default AdminLayout;
