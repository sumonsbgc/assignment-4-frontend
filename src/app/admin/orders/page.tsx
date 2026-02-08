"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminOrdersPage() {
	// Mock orders data - replace with actual data from API
	const orders = [
		{
			id: "ORD-001",
			customer: "John Doe",
			seller: "MediCare Pharmacy",
			date: "2026-02-07",
			status: "pending",
			total: 24.97,
			items: 2,
		},
		{
			id: "ORD-002",
			customer: "Jane Smith",
			seller: "HealthPlus Store",
			date: "2026-02-06",
			status: "processing",
			total: 45.99,
			items: 3,
		},
		{
			id: "ORD-003",
			customer: "Bob Johnson",
			seller: "MediCare Pharmacy",
			date: "2026-02-05",
			status: "shipped",
			total: 18.5,
			items: 1,
		},
		{
			id: "ORD-004",
			customer: "Alice Williams",
			seller: "Wellness Pharmacy",
			date: "2026-02-04",
			status: "delivered",
			total: 67.8,
			items: 4,
		},
		{
			id: "ORD-005",
			customer: "Charlie Brown",
			seller: "HealthPlus Store",
			date: "2026-02-03",
			status: "cancelled",
			total: 32.45,
			items: 2,
		},
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "pending":
				return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
			case "processing":
				return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
			case "shipped":
				return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
			case "delivered":
				return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
			case "cancelled":
				return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
			default:
				return <Badge>{status}</Badge>;
		}
	};

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
						<Select defaultValue="all">
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Orders</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="processing">Processing</SelectItem>
								<SelectItem value="shipped">Shipped</SelectItem>
								<SelectItem value="delivered">Delivered</SelectItem>
								<SelectItem value="cancelled">Cancelled</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Seller</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Items</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.id}</TableCell>
									<TableCell>{order.customer}</TableCell>
									<TableCell>{order.seller}</TableCell>
									<TableCell>
										{new Date(order.date).toLocaleDateString()}
									</TableCell>
									<TableCell>{order.items}</TableCell>
									<TableCell className="font-semibold">
										${order.total.toFixed(2)}
									</TableCell>
									<TableCell>{getStatusBadge(order.status)}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreVertical className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link href={`/admin/orders/${order.id}`}>
														<Eye className="w-4 h-4 mr-2" />
														View Details
													</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
