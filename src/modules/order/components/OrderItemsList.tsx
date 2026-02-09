import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { IOrderItem } from "@/models/Order";

type OrderItemsListProps = {
	items: IOrderItem[];
};

export function OrderItemsList({ items }: OrderItemsListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Order Items</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{items?.map((item, index) => (
						<div key={item.id}>
							{index > 0 && <Separator className="mb-4" />}
							<div className="flex gap-4">
								<div className="relative size-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
									{item.medicine.imageUrl ? (
										<Image
											src={item.medicine.imageUrl}
											alt={item.medicine.name}
											fill
											className="object-cover"
										/>
									) : (
										<ShoppingCart className="w-6 h-6 text-gray-400" />
									)}
								</div>

								<div className="flex-1">
									<h4 className="font-semibold mb-1">{item.medicine.name}</h4>
									<p className="text-xs text-gray-500 mb-2">
										{item.medicine.category.name}
									</p>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<span>
											৳{item.price.toFixed(2)} × {item.quantity}
										</span>
										{item.discount > 0 && (
											<Badge variant="secondary" className="text-xs">
												{item.discount}% off
											</Badge>
										)}
									</div>
								</div>

								<div className="text-right">
									<p className="font-semibold text-lg text-green-600">
										৳{item.subtotal.toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
