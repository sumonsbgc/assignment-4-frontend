"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";
import { IOrder, PaymentStatus } from "@/models/Order";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";

export type UpdatePaymentStatusResponse = {
	success: boolean;
	message: string;
	order: IOrder | null;
};

export type UpdatePaymentStatusData = {
	paymentStatus: PaymentStatus;
};

export async function updatePaymentStatus(
	orderId: string,
	data: UpdatePaymentStatusData,
): Promise<UpdatePaymentStatusResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.put<{ data: IOrder }>(
			`/orders/${orderId}/payment`,
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
				message: res.error || "Failed to update payment status",
				order: null,
			};
		}

		updateTag(CacheTags.Order);

		return {
			success: true,
			message: "Payment status updated successfully",
			order: res.data?.data || null,
		};
	} catch (error) {
		console.error("Error updating payment status:", error);
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to update payment status",
			order: null,
		};
	}
}
