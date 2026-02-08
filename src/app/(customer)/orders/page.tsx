"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, DollarSign, Eye } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
	// Mock orders data - replace with actual data from API
	const orders = [
		{
			id: "ORD-001",
			date: "2026-02-05",
			status: "delivered",
			total: 24.97,
			items: 2,
		},
		{
			id: "ORD-002",
			date: "2026-02-07",
			status: "processing",
			total: 45.99,
			items: 3,
		},
		{
			id: "ORD-003",
			date: "2026-02-08",
			status: "shipped",
			total: 18.5,
			items: 1,
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "delivered":
				return "bg-green-100 text-green-800";
			case "processing":
				return "bg-yellow-100 text-yellow-800";
			case "shipped":
				return "bg-blue-100 text-blue-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">My Orders</h1>
				<Button variant="outline" asChild>
					<Link href="/shop">Continue Shopping</Link>
				</Button>
			</div>

			{orders.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
						<h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
						<p className="text-gray-600 mb-6">
							Start shopping to see your orders here
						</p>
						<Button asChild>
							<Link href="/shop">Start Shopping</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					{orders.map((order) => (
						<Card key={order.id}>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-xl mb-2">
											Order {order.id}
										</CardTitle>
										<div className="flex flex-wrap gap-4 text-sm text-gray-600">
											<div className="flex items-center gap-1">
												<Calendar className="w-4 h-4" />
												<span>{new Date(order.date).toLocaleDateString()}</span>
											</div>
											<div className="flex items-center gap-1">
												<Package className="w-4 h-4" />
												<span>{order.items} items</span>
											</div>
											<div className="flex items-center gap-1">
												<DollarSign className="w-4 h-4" />
												<span>${order.total.toFixed(2)}</span>
											</div>
										</div>
									</div>
									<Badge className={getStatusColor(order.status)}>
										{order.status.charAt(0).toUpperCase() +
											order.status.slice(1)}
									</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex gap-2">
									<Button variant="outline" className="flex-1" asChild>
										<Link href={`/orders/${order.id}`}>
											<Eye className="w-4 h-4 mr-2" />
											View Details
										</Link>
									</Button>
									{order.status === "delivered" && (
										<Button variant="outline" className="flex-1">
											Order Again
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
