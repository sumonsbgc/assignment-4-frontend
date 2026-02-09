"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { IOrder } from "@/models/Order";

export type GetOrderByIdResponse = {
	status: boolean;
	message: string;
	data: IOrder | null;
};

export async function getOrderById(
	orderId: string,
): Promise<GetOrderByIdResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.get<IOrder>(`/orders/${orderId}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to fetch order",
				data: null,
			};
		}

		if (!res.data) {
			return {
				status: false,
				message: "Order not found",
				data: null,
			};
		}

		return {
			status: true,
			message: "Order fetched successfully",
			data: res.data,
		};
	} catch (error) {
		console.error("Error fetching order:", error);
		return {
			status: false,
			message: error instanceof Error ? error.message : "Failed to fetch order",
			data: null,
		};
	}
}
