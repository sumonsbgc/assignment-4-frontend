import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { ICart } from "@/models/Cart";

export type UpdateCartBody = {
	quantity: number;
};

export type UpdateCartResponse = {
	status: boolean;
	message: string;
	data: ICart | null;
};

export const updateCart = async (
	cartItemId: string,
	body: UpdateCartBody,
): Promise<UpdateCartResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.put(`/carts/${cartItemId}`, body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to update cart item",
				data: null,
			};
		}

		return {
			status: true,
			message:
				(res.data as { message?: string })?.message ||
				"Cart item updated successfully",
			data: (res.data as { data?: ICart })?.data || null,
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Something went wrong",
			data: null,
		};
	}
};
