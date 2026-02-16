"use server";

import { addToCart } from "../services/carts/addToCart";
import { removeFromCart } from "../services/carts/removeFromCart";
import { updateTag, refresh } from "next/cache";
import { CacheTags } from "../const";
import { updateCart } from "../services/carts/updateCart";

export async function addToCartAction(medicineId: string, quantity: number) {
	try {
		const result = await addToCart({
			medicineId,
			quantity,
		});

		if (result.status) {
			updateTag(CacheTags.Carts);
			refresh();
			return {
				success: true,
				message: result.message,
			};
		}

		return {
			success: false,
			message: result.message,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Failed to add to cart",
		};
	}
}

export async function removeFromCartAction(cartItemId: string) {
	try {
		const result = await removeFromCart(cartItemId);

		if (result.status) {
			updateTag(CacheTags.Carts);
			refresh();
			return {
				success: true,
				message: result.message,
			};
		}

		return {
			success: false,
			message: result.message,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to remove from cart",
		};
	}
}

export async function updateCartItemAction(
	cartItemId: string,
	quantity: number,
) {
	try {
		const result = await updateCart(cartItemId, { quantity: quantity });

		if (result.status) {
			updateTag(CacheTags.Carts);
			refresh();
			return {
				success: true,
				message: result.message,
				data: result.data,
			};
		}

		return {
			success: false,
			message: result.message,
			data: null,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to update cart item",
			data: null,
		};
	}
}
