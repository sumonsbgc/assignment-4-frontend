import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Package, Eye } from "lucide-react";
import Link from "next/link";
import { IOrder } from "@/models/Order";
import { getStatusColor, getPaymentStatusColor } from "../utils/statusColors";
import dayjs from "dayjs";

type OrderCardProps = {
	order: IOrder;
};

export function OrderCard({ order }: OrderCardProps) {
	return (
		<Card className="hover:shadow-md transition-shadow">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div className="flex-1">
						<div className="flex items-center gap-3 mb-2">
							<Package className="w-5 h-5 text-gray-500" />
							<h3 className="font-semibold text-lg">{order.orderNumber}</h3>
						</div>

						<div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								<span>
									{dayjs(order.createdAt).format("MMMM D, YYYY h:mm A")}
								</span>
							</div>
							<span>•</span>
							<span>{order?.orderItems?.length} items</span>
							<span>•</span>
							<span className="font-semibold text-green-600">
								৳{order?.totalAmount?.toFixed(2)}
							</span>
						</div>

						<div className="flex flex-wrap items-center gap-2 mt-3">
							<Badge
								className={`${getStatusColor(order?.status)} justify-center`}
							>
								{order?.status}
							</Badge>
							<Badge
								className={`${getPaymentStatusColor(order?.paymentStatus)} justify-center`}
							>
								{order?.paymentStatus}
							</Badge>
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" size="sm" asChild>
							<Link href={`/orders/${order.id}`}>
								<Eye className="w-4 h-4 mr-2" />
								View Details
							</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
