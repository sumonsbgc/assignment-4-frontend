"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	ArrowLeft,
	Package,
	Calendar,
	DollarSign,
	MapPin,
	User,
	Store,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function AdminOrderDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);

	// Mock order data - replace with actual data from API
	const order = {
		id: id,
		customer: {
			name: "John Doe",
			email: "john.doe@example.com",
			phone: "+1 (555) 123-4567",
		},
		seller: {
			name: "MediCare Pharmacy",
			email: "seller@medicare.com",
		},
		date: "2026-02-07",
		status: "processing",
		total: 45.99,
		subtotal: 38.99,
		shipping: 5.0,
		tax: 2.0,
		items: [
			{
				id: 1,
				name: "Paracetamol 500mg",
				price: 5.99,
				quantity: 2,
			},
			{
				id: 2,
				name: "Vitamin C 1000mg",
				price: 12.99,
				quantity: 1,
			},
			{
				id: 3,
				name: "Ibuprofen 200mg",
				price: 8.5,
				quantity: 2,
			},
		],
		shippingAddress: {
			name: "John Doe",
			street: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
		},
		trackingSteps: [
			{ label: "Order Placed", date: "2026-02-07 10:30", completed: true },
			{ label: "Processing", date: "2026-02-07 11:00", completed: true },
			{ label: "Shipped", date: "", completed: false },
			{ label: "Delivered", date: "", completed: false },
		],
	};

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
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-4 mb-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/admin/orders">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div className="flex-1">
					<h1 className="text-3xl font-bold">Order Details</h1>
					<p className="text-gray-600">View complete order information</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Order Details */}
				<div className="lg:col-span-2 space-y-6">
					{/* Order Header */}
					<Card>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-2xl mb-2">
										Order {order.id}
									</CardTitle>
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Calendar className="w-4 h-4" />
										<span>
											Placed on {new Date(order.date).toLocaleDateString()}
										</span>
									</div>
								</div>
								<Badge className={getStatusColor(order.status)}>
									{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
								</Badge>
							</div>
						</CardHeader>
					</Card>

					{/* Order Items */}
					<Card>
						<CardHeader>
							<CardTitle>Order Items</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{order.items.map((item, index) => (
									<div key={item.id}>
										<div className="flex justify-between items-start">
											<div className="flex-1">
												<h3 className="font-semibold">{item.name}</h3>
												<p className="text-sm text-gray-600">
													Quantity: {item.quantity}
												</p>
											</div>
											<div className="text-right">
												<p className="font-semibold">
													${(item.price * item.quantity).toFixed(2)}
												</p>
												<p className="text-sm text-gray-600">
													${item.price.toFixed(2)} each
												</p>
											</div>
										</div>
										{index < order.items.length - 1 && (
											<Separator className="mt-4" />
										)}
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Customer & Seller Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Customer Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex gap-3">
									<User className="w-5 h-5 text-gray-500 flex-shrink-0" />
									<div>
										<p className="font-semibold">{order.customer.name}</p>
										<p className="text-sm text-gray-600">
											{order.customer.email}
										</p>
										<p className="text-sm text-gray-600">
											{order.customer.phone}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Seller Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex gap-3">
									<Store className="w-5 h-5 text-gray-500 flex-shrink-0" />
									<div>
										<p className="font-semibold">{order.seller.name}</p>
										<p className="text-sm text-gray-600">
											{order.seller.email}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Shipping Address */}
					<Card>
						<CardHeader>
							<CardTitle>Shipping Address</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex gap-3">
								<MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
								<div>
									<p className="font-semibold">{order.shippingAddress.name}</p>
									<p className="text-gray-600">
										{order.shippingAddress.street}
									</p>
									<p className="text-gray-600">
										{order.shippingAddress.city}, {order.shippingAddress.state}{" "}
										{order.shippingAddress.zip}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Order Summary */}
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Subtotal</span>
									<span className="font-semibold">
										${order.subtotal.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Shipping</span>
									<span className="font-semibold">
										${order.shipping.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Tax</span>
									<span className="font-semibold">${order.tax.toFixed(2)}</span>
								</div>
							</div>
							<Separator />
							<div className="flex justify-between text-lg font-bold">
								<span>Total</span>
								<span className="text-green-600">
									${order.total.toFixed(2)}
								</span>
							</div>
							<div className="space-y-2 pt-4">
								<Button className="w-full" variant="outline">
									Download Invoice
								</Button>
								<Button className="w-full" variant="outline">
									Contact Customer
								</Button>
								<Button className="w-full" variant="outline">
									Contact Seller
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
