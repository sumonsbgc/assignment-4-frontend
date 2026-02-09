import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllOrders } from "@/modules/order/services/admin";
import { OrderStatus } from "@/models/Order";
import { Metadata } from "next";

import {
	AdminOrdersFilter,
	AdminOrdersPagination,
	AdminOrderList,
} from "@/modules/order/components/admin";

export const metadata: Metadata = {
	title: "All Orders - Admin | MediStore",
	description: "Monitor and manage all platform orders",
};

type AdminOrdersPageProps = {
	searchParams: Promise<{
		page?: string;
		status?: string;
	}>;
};

export default async function AdminOrdersPage({
	searchParams,
}: AdminOrdersPageProps) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const statusFilter = params.status as OrderStatus | undefined;

	const {
		data: orders,
		success,
		pagination,
	} = await getAllOrders(currentPage, 20, statusFilter);

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
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input placeholder="Search orders..." className="pl-10" />
						</div>
						<AdminOrdersFilter />
					</div>
				</CardHeader>
				<CardContent>
					{!success || orders?.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">No orders found</p>
						</div>
					) : (
						<>
							<AdminOrderList orders={orders} />
							<div className="mt-6">
								<AdminOrdersPagination pagination={pagination} />
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
