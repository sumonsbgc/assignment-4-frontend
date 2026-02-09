import Image from "next/image";
import Link from "next/link";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ICart } from "@/models/Cart";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Increment, Decrement, Remove } from "@/modules/shared/components";

const CartContent = ({
	carts,
	itemCount,
}: {
	carts: ICart[];
	itemCount: number;
}) => {
	const calculateTotal = () => {
		return carts?.reduce((total, item) => {
			const price =
				item.medicine.discountPrice > 0
					? item.medicine.discountPrice
					: item.medicine.price;
			return total + price * item.quantity;
		}, 0);
	};

	return (
		<SheetContent className="w-full sm:max-w-lg flex flex-col">
			<SheetHeader className="shrink-0 pb-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
				<SheetTitle className="flex items-center gap-2">
					<ShoppingCart className="size-6" />
					Shopping Cart
					{itemCount > 0 && (
						<Badge variant="secondary" className="ml-4 text-base">
							{itemCount} {itemCount === 1 ? "item" : "items"}
						</Badge>
					)}
				</SheetTitle>
			</SheetHeader>

			{itemCount === 0 ? (
				<div className="flex flex-col items-center justify-center flex-1 text-center">
					<ShoppingCart className="size-16 text-muted-foreground/50 mb-4" />
					<h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
					<p className="text-sm text-muted-foreground mb-6">
						Add items to your cart to get started
					</p>
					<Button asChild>
						<Link href="/shop">Browse Products</Link>
					</Button>
				</div>
			) : (
				<>
					<div className="flex-1 overflow-y-auto mt-6 px-1 space-y-4">
						{carts.map((item: ICart) => {
							const price =
								item.medicine.discountPrice > 0
									? item.medicine.discountPrice
									: item.medicine.price;

							return (
								<Card
									key={item.id}
									className="p-4 hover:shadow-md transition-shadow"
								>
									<div className="flex gap-3 items-start">
										<div className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden bg-muted">
											{item.medicine.imageUrl ? (
												<Image
													src={item.medicine.imageUrl}
													alt={item.medicine.name}
													fill
													className="object-cover"
												/>
											) : (
												<div className="flex items-center justify-center h-full w-full text-muted-foreground">
													<ShoppingCart className="size-8" />
												</div>
											)}
										</div>

										<div className="flex-1 min-w-0">
											<div className="flex w-full justify-between items-start gap-2">
												<div>
													<h4 className="font-semibold text-sm truncate mb-1">
														{item.medicine.name}
													</h4>
													<p className="text-sm text-muted-foreground mb-2">
														৳{price.toFixed(2)} each
													</p>
												</div>

												<Remove item={item} />
											</div>

											<div className="flex items-center gap-2">
												<div className="flex items-center border rounded-md">
													<Decrement item={item} />
													<span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
														{item.quantity}
													</span>
													<Increment item={item} />
												</div>
												<span className="text-sm font-semibold ml-auto">
													৳{(price * item.quantity).toFixed(2)}
												</span>
											</div>
										</div>
									</div>
								</Card>
							);
						})}
					</div>

					<div className="shrink-0 border-t pt-4 pb-2 px-4 mt-4 space-y-4 bg-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
						<div className="flex items-center justify-between text-base font-semibold px-1">
							<span>Subtotal</span>
							<span>৳{calculateTotal().toFixed(2)}</span>
						</div>
						<Button asChild className="w-full" size="lg">
							<Link href="/cart">Proceed To Cart</Link>
						</Button>
					</div>
				</>
			)}
		</SheetContent>
	);
};

export default CartContent;
