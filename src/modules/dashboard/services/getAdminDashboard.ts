import { api } from "@/api/Api";
import { cookies } from "next/headers";
import type { AdminDashboardData, DashboardAPIResponse } from "../types";

export const getAdminDashboard =
	async (): Promise<AdminDashboardData | null> => {
		try {
			const cookieStore = await cookies();

			const res = await api.get<DashboardAPIResponse<AdminDashboardData>>(
				"/dashboard/admin",
				{
					headers: {
						Cookie: cookieStore.toString(),
					},
					next: {
						revalidate: 60,
					},
				},
			);

			if (!res?.data?.data) {
				return null;
			}

			return res.data.data;
		} catch (error) {
			console.error("Error fetching admin dashboard:", error);
			return null;
		}
	};
