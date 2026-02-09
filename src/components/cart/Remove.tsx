"use client";

import { Button } from "../ui/button";
import { ICart } from "@/models/Cart";
import { removeFromCartAction } from "@/modules/shared/actions/cart.actions";
import { Trash2 } from "lucide-react";

const Remove = ({ item }: { item: ICart }) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="size-8 shrink-0 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 self-center"
			onClick={() => removeFromCartAction(item.id)}
			disabled={!removeFromCartAction || item.quantity <= 1}
		>
			<Trash2 className="h-4 w-4" />
			<span className="sr-only">Remove item</span>
		</Button>
	);
};

export default Remove;
