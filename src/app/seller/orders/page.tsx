import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import Link from "next/link";
import { getSellerOrders } from "@/modules/order/services/seller";
import { OrderStatus } from "@/models/Order";
import {
	getStatusColor,
	getPaymentStatusColor,
} from "@/modules/order/utils/statusColors";
import { Metadata } from "next";
import { SellerOrdersFilter } from "./_components/SellerOrdersFilter";
import { SellerOrdersPagination } from "./_components/SellerOrdersPagination";

export const metadata: Metadata = {
	title: "My Orders - Seller | MediStore",
	description: "Manage and fulfill customer orders",
};

type SellerOrdersPageProps = {
	searchParams: Promise<{
		page?: string;
		status?: string;
	}>;
};

export default async function SellerOrdersPage({
	searchParams,
}: SellerOrdersPageProps) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const statusFilter = params.status as OrderStatus | "ALL" | undefined;

	const {
		data: orders,
		success,
		pagination,
	} = await getSellerOrders(
		currentPage,
		20,
		statusFilter && statusFilter !== "ALL" ? statusFilter : undefined,
	);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Orders</h1>
					<p className="text-gray-600">Manage and fulfill customer orders</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input placeholder="Search orders..." className="pl-10" />
						</div>
						<SellerOrdersFilter />
					</div>
				</CardHeader>
				<CardContent>
					{!success || orders.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">No orders found</p>
						</div>
					) : (
						<>
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
											<TableCell className="font-medium">
												{order.orderNumber}
											</TableCell>
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
												<Badge
													className={getPaymentStatusColor(order.paymentStatus)}
												>
													{order.paymentStatus}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<Button variant="ghost" size="sm" asChild>
													<Link href={`/seller/orders/${order.id}`}>
														<Eye className="w-4 h-4 mr-2" />
														View
													</Link>
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							<div className="mt-6">
								<SellerOrdersPagination pagination={pagination} />
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
