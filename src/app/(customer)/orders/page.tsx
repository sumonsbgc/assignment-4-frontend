import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	getOrders,
	OrderCard,
	OrderEmpty,
	OrdersPagination,
} from "@/modules/order";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Orders - MediStore",
	description: "View and track your orders at MediStore",
};

type OrdersPageProps = {
	searchParams: Promise<{ page?: string }>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const {
		data: orders,
		success,
		pagination,
	} = await getOrders(currentPage, 10);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">My Orders</h1>
				<Button variant="outline" asChild>
					<Link href="/shop">Continue Shopping</Link>
				</Button>
			</div>

			{!success || orders?.length === 0 ? (
				<OrderEmpty />
			) : (
				<>
					<div className="space-y-4">
						{orders?.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>

					<OrdersPagination pagination={pagination} basePath="/orders" />
				</>
			)}
		</div>
	);
}
