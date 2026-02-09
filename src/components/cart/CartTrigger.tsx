"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SheetTrigger } from "@/components/ui/sheet";

interface CartTriggerProps {
	itemCount?: number;
}

const CartTrigger = ({ itemCount = 1 }: CartTriggerProps) => {
	return (
		<SheetTrigger asChild>
			<Button variant="ghost" size="icon" className="relative">
				<ShoppingCart className="size-6" />
				{itemCount >= 0 && (
					<Badge
						variant="destructive"
						className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
					>
						{itemCount > 99 ? "99+" : itemCount}
					</Badge>
				)}
				<span className="sr-only">Shopping Cart</span>
			</Button>
		</SheetTrigger>
	);
};

export default CartTrigger;
