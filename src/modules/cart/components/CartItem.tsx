"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ICart } from "@/models/Cart";
import { Increment, Decrement, Remove } from "@/modules/shared/components";

type CartItemProps = {
	item: ICart;
};

export function CartItem({ item }: CartItemProps) {
	const price =
		item.medicine.discountPrice > 0
			? item.medicine.discountPrice
			: item.medicine.price;

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex gap-4">
					<div className="relative size-28 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
						{item.medicine.imageUrl ? (
							<Image
								src={item.medicine.imageUrl}
								alt={item.medicine.name}
								fill
								className="object-cover"
							/>
						) : (
							<ShoppingCart className="w-8 h-8 text-gray-400" />
						)}
					</div>

					<div className="flex-1">
						<div className="flex justify-between items-start mb-2">
							<div>
								<h3 className="font-semibold text-lg mb-1">
									{item.medicine.name}
								</h3>
								<div className="flex items-center gap-2 mb-2">
									<p className="text-xs text-gray-400">
										{item.medicine.category.name}
									</p>
									<span className="text-gray-300">•</span>
									<p className="text-sm text-gray-500">
										৳{price.toFixed(2)} each
									</p>
								</div>
							</div>
							<Remove item={item} />
						</div>

						<div className="flex justify-between items-end">
							<div className="flex items-center border rounded-md">
								<Decrement item={item} />
								<span className="px-4 py-2 text-sm font-medium min-w-12 text-center">
									{item.quantity}
								</span>
								<Increment item={item} />
							</div>
							<span className="text-xl font-bold text-green-600">
								৳{(price * item.quantity).toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
