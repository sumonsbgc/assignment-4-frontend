import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { CacheTags } from "../../const";
import { ICart } from "@/models/Cart";

export type CartSummary = {
	items: ICart[];
	subtotal: number;
	totalItems: number;
	totalQuantity: number;
};

export type GetCartsResponse = {
	status: boolean;
	message?: string;
	data: CartSummary | null;
};

export const getCarts = async (): Promise<GetCartsResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.get("/carts", {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.Carts],
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to fetch cart",
				data: null,
			};
		}

		const cartData = (res.data as GetCartsResponse)?.data;

		return {
			status: true,
			data: cartData || {
				items: [],
				subtotal: 0,
				totalItems: 0,
				totalQuantity: 0,
			},
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Something went wrong",
			data: null,
		};
	}
};
