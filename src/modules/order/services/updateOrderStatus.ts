"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { IOrder, OrderStatus } from "@/models/Order";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";

export type UpdateOrderStatusResponse = {
	success: boolean;
	message: string;
	order: IOrder | null;
};

export type UpdateOrderStatusData = {
	status: OrderStatus;
	trackingNumber?: string;
};

export async function updateOrderStatus(
	orderId: string,
	data: UpdateOrderStatusData,
): Promise<UpdateOrderStatusResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.put<{ data: IOrder }>(
			`/orders/${orderId}/status`,
			data,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error) {
			return {
				success: false,
				message: res.error || "Failed to update order status",
				order: null,
			};
		}

		// Revalidate cache
		updateTag(CacheTags.Order);

		return {
			success: true,
			message: "Order status updated successfully",
			order: res.data?.data || null,
		};
	} catch (error) {
		console.error("Error updating order status:", error);
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to update order status",
			order: null,
		};
	}
}
