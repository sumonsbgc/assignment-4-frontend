import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	getOrderById,
	OrderHeader,
	OrderItemsList,
	OrderShippingInfo,
	OrderSummary,
} from "@/modules/order";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminOrderActions } from "@/modules/order/components/admin";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;

	return {
		title: `Order ${id} - Admin | MediStore`,
		description: "View and manage order details",
	};
}

export default async function AdminOrderDetailPage({ params }: Props) {
	const { id } = await params;
	const { order, status } = await getOrderById(id);

	if (!status || !order) {
		notFound();
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center justify-between mb-4">
				<Button variant="ghost" asChild>
					<Link href="/admin/orders">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Orders
					</Link>
				</Button>

				<AdminOrderActions order={order} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					<OrderHeader order={order} />
					<OrderItemsList items={order.orderItems} />
					<OrderShippingInfo order={order} />
				</div>

				<div className="lg:col-span-1">
					<OrderSummary order={order} />
				</div>
			</div>
		</div>
	);
}
