"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { IOrder } from "@/models/Order";

export type GetOrdersResponse = {
	success: boolean;
	data: IOrder[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasMore: boolean;
	};
};

export async function getOrders(
	page: number = 1,
	limit: number = 10,
): Promise<GetOrdersResponse> {
	try {
		const cookieStore = await cookies();
		const url = `/orders?page=${page}&limit=${limit}`;

		const res = await api.get<{
			data: IOrder[];
			pagination: {
				page: number;
				limit: number;
				total: number;
				totalPages: number;
			};
		}>(url, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				success: false,
				data: [],
				pagination: {
					page: 1,
					limit: limit,
					total: 0,
					totalPages: 0,
					hasMore: false,
				},
			};
		}

		if (!res.data) {
			return {
				success: false,
				data: [],
				pagination: {
					page: 1,
					limit: limit,
					total: 0,
					totalPages: 0,
					hasMore: false,
				},
			};
		}

		return {
			success: true,
			data: res.data.data,
			pagination: {
				...res.data.pagination,
				hasMore: res.data.pagination.page < res.data.pagination.totalPages,
			},
		};
	} catch (error) {
		console.error("Error fetching orders:", error);
		return {
			success: false,
			data: [],
			pagination: {
				page: 1,
				limit: limit,
				total: 0,
				totalPages: 0,
				hasMore: false,
			},
		};
	}
}
