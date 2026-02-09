"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { IOrder } from "@/models/Order";

export type GetOrderByIdResponse = {
	status: boolean;
	message: string;
	order: IOrder | null;
};

export async function getOrderById(
	orderId: string,
): Promise<GetOrderByIdResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.get<{ data: IOrder }>(`/orders/${orderId}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		console.log("API Response for getOrderById:", res);

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to fetch order",
				order: null,
			};
		}

		if (!res.data?.data) {
			return {
				status: false,
				message: "Order not found",
				order: null,
			};
		}

		return {
			status: true,
			message: "Order fetched successfully",
			order: res.data.data,
		};
	} catch (error) {
		console.error("Error fetching order:", error);
		return {
			status: false,
			message: error instanceof Error ? error.message : "Failed to fetch order",
			order: null,
		};
	}
}
