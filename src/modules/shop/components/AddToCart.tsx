"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Medicine } from "../types";

const AddToCart = ({ medicine }: { medicine: Medicine }) => {
	const onAddToCart = () => {};

	return (
		<Button
			className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
			onClick={onAddToCart}
			disabled={medicine.stockQuantity === 0}
		>
			<ShoppingCart className="h-4 w-4 mr-2" />
			{medicine.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
		</Button>
	);
};

export default AddToCart;
