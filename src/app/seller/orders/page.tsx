import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSellerOrders } from "@/modules/order/services";
import { OrderStatus } from "@/models/Order";
import { Metadata } from "next";
import {
	OrdersFilter,
	OrderSearch,
	OrdersPagination,
	OrderList,
} from "@/modules/order/components";

export const metadata: Metadata = {
	title: "My Orders - Seller | MediStore",
	description: "Manage and fulfill customer orders",
};

type SellerOrdersPageProps = {
	searchParams: Promise<{
		page?: string;
		status?: string;
		search?: string;
	}>;
};

export default async function SellerOrdersPage({
	searchParams,
}: SellerOrdersPageProps) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const statusFilter = params.status as OrderStatus | "ALL" | undefined;
	const searchQuery = params.search || undefined;

	const {
		data: orders,
		success,
		pagination,
	} = await getSellerOrders(
		currentPage,
		20,
		statusFilter && statusFilter !== "ALL" ? statusFilter : undefined,
		searchQuery,
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
						<OrderSearch basePath="/seller/orders" />
						<OrdersFilter basePath="/seller/orders" />
					</div>
				</CardHeader>
				<CardContent>
					{!success || orders.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">No orders found</p>
						</div>
					) : (
						<>
							<OrderList orders={orders} basePath="/seller/orders" />
							<div className="mt-6">
								<OrdersPagination
									pagination={pagination}
									basePath="/seller/orders"
								/>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
