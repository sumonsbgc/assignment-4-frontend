"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CartSummaryProps = {
	subtotal: number;
	totalQuantity: number;
	shippingCost: number;
	tax: number;
	total: number;
};

export function CartSummary({
	subtotal,
	totalQuantity,
	shippingCost,
	tax,
	total,
}: CartSummaryProps) {
	return (
		<Card className="sticky top-24">
			<CardHeader>
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between">
					<span className="text-gray-600">
						Subtotal ({totalQuantity} items)
					</span>
					<span className="font-semibold">৳{subtotal.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-600">Shipping</span>
					<span className="font-semibold">
						{shippingCost === 0 ? (
							<span className="text-green-600">Free</span>
						) : (
							`৳${shippingCost.toFixed(2)}`
						)}
					</span>
				</div>
				{subtotal > 0 && subtotal <= 500 && (
					<p className="text-xs text-gray-500">
						Add ৳{(500 - subtotal).toFixed(2)} more for free shipping
					</p>
				)}
				<div className="flex justify-between">
					<span className="text-gray-600">Tax (5%)</span>
					<span className="font-semibold">৳{tax.toFixed(2)}</span>
				</div>
				<div className="border-t pt-4">
					<div className="flex justify-between text-lg font-bold">
						<span>Total</span>
						<span className="text-green-600">৳{total.toFixed(2)}</span>
					</div>
				</div>
				<Button className="w-full" size="lg" asChild>
					<Link href="/checkout">Proceed to Checkout</Link>
				</Button>
				<Button variant="outline" className="w-full" asChild>
					<Link href="/shop">Continue Shopping</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
