import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { IOrder } from "@/models/Order";

type OrderShippingInfoProps = {
	order: IOrder;
};

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Shipping Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-3">
					<MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
					<div className="flex-1">
						<p className="font-semibold mb-1">Delivery Address</p>
						<p className="text-sm text-muted-foreground">
							{order.shippingAddress}
						</p>
						<p className="text-sm text-muted-foreground">
							{order.city}
							{order.state && `, ${order.state}`} {order.zipCode}
						</p>
						{order.country && (
							<p className="text-sm text-muted-foreground">{order.country}</p>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<Phone className="w-5 h-5 text-gray-500 mt-0.5" />
					<div className="flex-1">
						<p className="font-semibold mb-1">Contact Phone</p>
						<p className="text-sm text-muted-foreground">{order.phone}</p>
					</div>
				</div>

				{order.trackingNumber && (
					<div className="pt-3 border-t">
						<p className="font-semibold mb-1">Tracking Number</p>
						<p className="text-sm font-mono bg-gray-100 p-2 rounded">
							{order.trackingNumber}
						</p>
					</div>
				)}

				{order.notes && (
					<div className="pt-3 border-t">
						<p className="font-semibold mb-1">Delivery Notes</p>
						<p className="text-sm text-muted-foreground">{order.notes}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
