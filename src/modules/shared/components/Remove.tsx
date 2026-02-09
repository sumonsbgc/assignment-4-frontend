"use client";

import { Button } from "@/components/ui/button";
import { ICart } from "@/models/Cart";
import { removeFromCartAction } from "../actions/cart.actions";
import { Trash2 } from "lucide-react";

const Remove = ({ item }: { item: ICart }) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="size-8 shrink-0 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 self-center"
			onClick={() => removeFromCartAction(item.id)}
		>
			<Trash2 className="h-4 w-4" />
			<span className="sr-only">Remove item</span>
		</Button>
	);
};

export default Remove;
