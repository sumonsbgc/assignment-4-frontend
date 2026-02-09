"use client";

import { Button } from "../ui/button";
import { ICart } from "@/models/Cart";
import { Plus } from "lucide-react";
import { updateCartItemAction } from "@/modules/shared/actions/cart.actions";

const Increment = ({ item }: { item: ICart }) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-7 w-7"
			onClick={() => updateCartItemAction?.(item.id, item.quantity + 1)}
			disabled={!updateCartItemAction}
		>
			<Plus className="h-3 w-3" />
		</Button>
	);
};

export default Increment;
