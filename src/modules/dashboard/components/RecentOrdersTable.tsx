import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import dayjs from "dayjs";

interface RecentOrder {
	id: string;
	orderNumber: string;
	status: string;
	totalAmount: number;
	createdAt: string;
	itemCount?: number;
	paymentStatus?: string;
	user?: { id: string; name: string; email: string };
}

interface RecentOrdersTableProps {
	orders: RecentOrder[];
	showUser?: boolean;
	showPayment?: boolean;
	title?: string;
}

export const RecentOrdersTable = ({
	orders,
	showUser = false,
	showPayment = false,
	title = "Recent Orders",
}: RecentOrdersTableProps) => {
	if (!orders.length) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground text-center py-6">
						No orders yet
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order #</TableHead>
							{showUser && <TableHead>Customer</TableHead>}
							<TableHead>Status</TableHead>
							{showPayment && <TableHead>Payment</TableHead>}
							<TableHead className="text-right">Amount</TableHead>
							<TableHead className="text-right">Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order) => (
							<TableRow key={order.id}>
								<TableCell className="font-medium">
									{order.orderNumber}
								</TableCell>
								{showUser && order.user && (
									<TableCell>
										<div>
											<p className="font-medium text-sm">{order.user.name}</p>
											<p className="text-xs text-muted-foreground">
												{order.user.email}
											</p>
										</div>
									</TableCell>
								)}
								<TableCell>
									<StatusBadge status={order.status} />
								</TableCell>
								{showPayment && order.paymentStatus && (
									<TableCell>
										<StatusBadge status={order.paymentStatus} />
									</TableCell>
								)}
								<TableCell className="text-right">
									৳{order.totalAmount.toLocaleString()}
								</TableCell>
								<TableCell className="text-right text-sm text-muted-foreground">
									{dayjs(order.createdAt).format("MMM DD, YYYY")}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
