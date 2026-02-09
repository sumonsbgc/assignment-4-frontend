"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";

export type CreateOrderDto = {
	shippingAddress: string;
	city: string;
	state?: string;
	zipCode: string;
	country: string;
	phone: string;
	notes?: string;
	paymentMethod: string;
};

export type CreateOrderResponse = {
	status: boolean;
	message: string;
	data: {
		id: string;
		orderNumber: string;
		totalAmount: number;
	} | null;
};

export const createOrder = async (
	orderData: CreateOrderDto,
): Promise<CreateOrderResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.post("/orders", orderData, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to create order",
				data: null,
			};
		}

		updateTag(CacheTags.Order);
		updateTag(CacheTags.Carts);
		updateTag(CacheTags.Medicines);

		const orderResult = res.data as {
			message?: string;
			data?: {
				id: string;
				orderNumber: string;
				totalAmount: number;
			};
		};

		return {
			status: true,
			message: orderResult.message || "Order placed successfully",
			data: orderResult.data
				? {
						id: orderResult.data.id,
						orderNumber: orderResult.data.orderNumber,
						totalAmount: orderResult.data.totalAmount,
					}
				: null,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to create order",
			data: null,
		};
	}
};
