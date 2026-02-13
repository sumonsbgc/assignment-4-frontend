import { api } from "@/api/Api";
import { cookies } from "next/headers";
import type { SellerDashboardData, DashboardAPIResponse } from "../types";

export const getSellerDashboard =
	async (): Promise<SellerDashboardData | null> => {
		try {
			const cookieStore = await cookies();

			const res = await api.get<DashboardAPIResponse<SellerDashboardData>>(
				"/dashboard/seller",
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
			console.error("Error fetching seller dashboard:", error);
			return null;
		}
	};
