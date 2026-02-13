"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { IOrder } from "@/models/Order";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";

export type CancelOrderResponse = {
	success: boolean;
	message: string;
	order: IOrder | null;
};

export async function cancelOrder(
	orderId: string,
): Promise<CancelOrderResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.put<{ data: IOrder }>(
			`/orders/${orderId}/cancel`,
			{},
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error) {
			return {
				success: false,
				message: res.error || "Failed to cancel order",
				order: null,
			};
		}

		updateTag(CacheTags.Order);

		return {
			success: true,
			message: "Order cancelled successfully",
			order: res.data?.data ?? null,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to cancel order",
			order: null,
		};
	}
}
