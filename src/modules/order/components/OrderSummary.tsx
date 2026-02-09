"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IOrder } from "@/models/Order";

type OrderSummaryProps = {
	order: IOrder;
};

export function OrderSummary({ order }: OrderSummaryProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Subtotal</span>
					<span>৳{order?.subtotal?.toFixed(2)}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Shipping</span>
					<span>
						{order?.shippingCost === 0 ? (
							<span className="text-green-600">Free</span>
						) : (
							`৳${order?.shippingCost?.toFixed(2)}`
						)}
					</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Tax (5%)</span>
					<span>৳{order?.tax?.toFixed(2)}</span>
				</div>
				<Separator />
				<div className="flex justify-between text-lg font-semibold">
					<span>Total</span>
					<span className="text-green-600">
						৳{order?.totalAmount?.toFixed(2)}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
