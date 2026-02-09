import { api } from "@/api/Api";
import { cookies } from "next/headers";

export type RemoveCartResponse = {
	status: boolean;
	message: string;
};

export const removeFromCart = async (
	cartItemId: string,
): Promise<RemoveCartResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.delete(`/carts/${cartItemId}`, undefined, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to remove item from cart",
			};
		}

		return {
			status: true,
			message:
				(res.data as { message?: string })?.message ||
				"Item removed from cart successfully",
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
};
