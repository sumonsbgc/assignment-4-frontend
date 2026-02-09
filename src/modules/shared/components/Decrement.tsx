"use client";

import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { ICart } from "@/models/Cart";
import { updateCartItemAction } from "../actions/cart.actions";

const Decrement = ({ item }: { item: ICart }) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-7 w-7"
			onClick={() => updateCartItemAction?.(item.id, item.quantity - 1)}
			disabled={!updateCartItemAction || item.quantity <= 1}
		>
			<Minus className="h-3 w-3" />
		</Button>
	);
};

export default Decrement;
