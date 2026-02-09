"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Medicine } from "../types";
import { addToCartAction } from "@/modules/shared/actions/cart.actions";
import { useTransition } from "react";
import { aark } from "aark-react-modalify";

const AddToCart = ({ medicine }: { medicine: Medicine }) => {
	const [isPending, startTransition] = useTransition();

	const handleAddToCart = async () => {
		startTransition(async () => {
			const result = await addToCartAction(medicine.id, 1);
			if (result.success) {
				aark.notification({
					title: "Success",
					text: result.message || "Added to cart successfully!",
					type: "success",
				});
			} else {
				aark.notification({
					title: "Error",
					text: result.message || "Failed to add to cart",
					type: "error",
				});
			}
		});
	};

	return (
		<Button
			onClick={handleAddToCart}
			className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
			disabled={medicine.stockQuantity === 0 || isPending}
		>
			<ShoppingCart className="h-4 w-4 mr-2" />
			{isPending
				? "Adding..."
				: medicine.stockQuantity === 0
					? "Out of Stock"
					: "Add to Cart"}
		</Button>
	);
};

export default AddToCart;
