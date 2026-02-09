import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { ICart } from "@/models/Cart";

export type CartBody = {
	medicineId: string;
	quantity: number;
};

export type AddToCartResponse = {
	status: boolean;
	message: string;
	data: ICart | null;
};

export const addToCart = async (body: CartBody): Promise<AddToCartResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.post("/carts", body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to add item to cart",
				data: null,
			};
		}

		return {
			status: true,
			message:
				(res.data as AddToCartResponse)?.message ||
				"Item added to cart successfully",
			data: (res.data as AddToCartResponse)?.data || null,
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Something went wrong",
			data: null,
		};
	}
};
