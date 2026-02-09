import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/models/Order";
import { Badge } from "@/components/ui/badge";
import { getPaymentStatusColor, getStatusColor } from "../..";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

export const AdminOrderList = ({ orders }: { orders: IOrder[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Order Number</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Items</TableHead>
					<TableHead>Total</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Payment</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.id}>
						<TableCell className="font-medium">{order.orderNumber}</TableCell>
						<TableCell>
							{order.user?.name || "N/A"}
							<div className="text-xs text-muted-foreground">
								{order.user?.email}
							</div>
						</TableCell>
						<TableCell>
							{new Date(order.createdAt).toLocaleDateString()}
						</TableCell>
						<TableCell>{order.orderItems?.length || 0}</TableCell>
						<TableCell className="font-semibold">
							৳{order.totalAmount.toFixed(2)}
						</TableCell>
						<TableCell>
							<Badge className={getStatusColor(order.status)}>
								{order.status}
							</Badge>
						</TableCell>
						<TableCell>
							<Badge className={getPaymentStatusColor(order.paymentStatus)}>
								{order.paymentStatus}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<Button variant="ghost" size="sm" asChild>
								<Link href={`/admin/orders/${order.id}`}>
									<Eye className="w-4 h-4 mr-2" />
									View
								</Link>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
