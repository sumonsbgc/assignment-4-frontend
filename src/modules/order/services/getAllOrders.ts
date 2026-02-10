"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { IOrder, OrderStatus } from "@/models/Order";
import { CacheTags } from "@/modules/shared/const";

export type GetAllOrdersResponse = {
	success: boolean;
	message: string;
	data: IOrder[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasMore: boolean;
	};
};

export async function getAllOrders(
	page: number = 1,
	limit: number = 20,
	status?: OrderStatus,
): Promise<GetAllOrdersResponse> {
	try {
		const cookieStore = await cookies();

		const params = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
		});

		if (status) {
			params.append("status", status);
		}

		const res = await api.get<{
			data: IOrder[];
			pagination: {
				page: number;
				limit: number;
				total: number;
				totalPages: number;
				hasMore: boolean;
			};
		}>(`/orders/all?${params.toString()}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.Order],
			},
		});

		if (!res.success || res.error) {
			return {
				success: false,
				message: res.error || "Failed to fetch orders",
				data: [],
				pagination: {
					page: 1,
					limit: 20,
					total: 0,
					totalPages: 0,
					hasMore: false,
				},
			};
		}

		return {
			success: true,
			message: "Orders fetched successfully",
			data: res.data?.data || [],
			pagination: res.data?.pagination || {
				page: 1,
				limit: 20,
				total: 0,
				totalPages: 0,
				hasMore: false,
			},
		};
	} catch (error) {
		console.error("Error fetching all orders:", error);
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to fetch orders",
			data: [],
			pagination: {
				page: 1,
				limit: 20,
				total: 0,
				totalPages: 0,
				hasMore: false,
			},
		};
	}
}
