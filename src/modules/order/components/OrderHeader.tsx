import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, CreditCard } from "lucide-react";
import { IOrder } from "@/models/Order";
import { getStatusColor, getPaymentStatusColor } from "../utils/statusColors";
import dayjs from "dayjs";

type OrderHeaderProps = {
	order: IOrder;
};

export function OrderHeader({ order }: OrderHeaderProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<div>
						<CardTitle className="text-2xl mb-2">
							Order {order.orderNumber}
						</CardTitle>
						<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								<span>
									{dayjs(order.createdAt).format("MMMM D, YYYY h:mm A")}
								</span>
							</div>
							<span>•</span>
							<div className="flex items-center gap-1">
								<Package className="w-4 h-4" />
								<span>{order?.orderItems?.length} items</span>
							</div>
							<span>•</span>
							<div className="flex items-center gap-1">
								<CreditCard className="w-4 h-4" />
								<span>{order.paymentMethod}</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Badge className={`${getStatusColor(order.status)} justify-center`}>
							{order.status}
						</Badge>
						<Badge
							className={`${getPaymentStatusColor(order.paymentStatus)} justify-center`}
						>
							{order.paymentStatus}
						</Badge>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}
