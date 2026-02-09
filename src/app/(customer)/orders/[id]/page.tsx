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

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;

	return {
		title: `Order ${id} - MediStore`,
		description: "View order details and tracking information",
	};
}

export default async function OrderDetailPage({ params }: Props) {
	const { id } = await params;
	const orderResponse = await getOrderById(id);

	if (!orderResponse.status || !orderResponse.data) {
		notFound();
	}

	const order = orderResponse.data;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<Button variant="ghost" asChild>
					<Link href="/orders">← Back to Orders</Link>
				</Button>
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
