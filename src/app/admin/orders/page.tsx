import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllOrders } from "@/modules/order/services";
import { OrderStatus } from "@/models/Order";
import { Metadata } from "next";

import {
	OrdersFilter,
	OrderSearch,
	OrdersPagination,
	OrderList,
} from "@/modules/order/components";

export const metadata: Metadata = {
	title: "All Orders - Admin | MediStore",
	description: "Monitor and manage all platform orders",
};

type AdminOrdersPageProps = {
	searchParams: Promise<{
		page?: string;
		status?: string;
		search?: string;
	}>;
};

export default async function AdminOrdersPage({
	searchParams,
}: AdminOrdersPageProps) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const statusFilter = params.status as OrderStatus | undefined;
	const searchQuery = params.search || undefined;

	const {
		data: orders,
		success,
		pagination,
	} = await getAllOrders(currentPage, 20, statusFilter, searchQuery);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">All Orders</h1>
					<p className="text-gray-600">
						Monitor and manage all platform orders
					</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row gap-4">
						<OrderSearch basePath="/admin/orders" />
						<OrdersFilter basePath="/admin/orders" />
					</div>
				</CardHeader>
				<CardContent>
					{!success || orders?.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">No orders found</p>
						</div>
					) : (
						<>
							<OrderList orders={orders} basePath="/admin/orders" />
							<div className="mt-6">
								<OrdersPagination
									pagination={pagination}
									basePath="/admin/orders"
								/>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
