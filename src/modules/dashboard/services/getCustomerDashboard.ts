import { api } from "@/api/Api";
import { cookies } from "next/headers";
import type { CustomerDashboardData, DashboardAPIResponse } from "../types";

export const getCustomerDashboard =
	async (): Promise<CustomerDashboardData | null> => {
		try {
			const cookieStore = await cookies();

			const res = await api.get<DashboardAPIResponse<CustomerDashboardData>>(
				"/dashboard/customer",
				{
					headers: {
						Cookie: cookieStore.toString(),
					},
					next: {
						revalidate: 60, // revalidate every minute
					},
				},
			);

			if (!res?.data?.data) {
				return null;
			}

			return res.data.data;
		} catch (error) {
			console.error("Error fetching customer dashboard:", error);
			return null;
		}
	};
