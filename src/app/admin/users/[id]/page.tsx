"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ArrowLeft,
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Shield,
	ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function AdminUserDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);

	// Mock user data - replace with actual data from API
	const user = {
		id: id,
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		role: "customer",
		status: "active",
		joinDate: "2026-01-15",
		lastLogin: "2026-02-08",
		address: {
			street: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
		},
		stats: {
			totalOrders: 12,
			totalSpent: 456.78,
			averageOrder: 38.07,
		},
		recentOrders: [
			{ id: "ORD-001", date: "2026-02-07", total: 24.97, status: "delivered" },
			{ id: "ORD-002", date: "2026-02-05", total: 45.99, status: "processing" },
			{ id: "ORD-003", date: "2026-02-01", total: 18.5, status: "delivered" },
		],
	};

	const getRoleBadge = (role: string) => {
		switch (role) {
			case "admin":
				return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
			case "seller":
				return <Badge className="bg-blue-100 text-blue-800">Seller</Badge>;
			case "customer":
				return <Badge className="bg-green-100 text-green-800">Customer</Badge>;
			default:
				return <Badge>{role}</Badge>;
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return <Badge className="bg-green-100 text-green-800">Active</Badge>;
			case "suspended":
				return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
			case "pending":
				return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
			default:
				return <Badge>{status}</Badge>;
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-4 mb-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/admin/users">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div className="flex-1">
					<h1 className="text-3xl font-bold">User Details</h1>
					<p className="text-gray-600">View and manage user information</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* User Details */}
				<div className="lg:col-span-2 space-y-6">
					{/* User Header */}
					<Card>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-2xl mb-2">{user.name}</CardTitle>
									<p className="text-gray-600">{user.email}</p>
								</div>
								<div className="flex gap-2">
									{getRoleBadge(user.role)}
									{getStatusBadge(user.status)}
								</div>
							</div>
						</CardHeader>
					</Card>

					{/* User Information */}
					<Tabs defaultValue="details" className="space-y-6">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="details">Details</TabsTrigger>
							<TabsTrigger value="orders">Orders</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						{/* Details Tab */}
						<TabsContent value="details">
							<Card>
								<CardHeader>
									<CardTitle>Personal Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="flex gap-3">
											<User className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
											<div>
												<p className="text-sm text-gray-600">Full Name</p>
												<p className="font-semibold">{user.name}</p>
											</div>
										</div>
										<div className="flex gap-3">
											<Mail className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
											<div>
												<p className="text-sm text-gray-600">Email</p>
												<p className="font-semibold">{user.email}</p>
											</div>
										</div>
										<div className="flex gap-3">
											<Phone className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
											<div>
												<p className="text-sm text-gray-600">Phone</p>
												<p className="font-semibold">{user.phone}</p>
											</div>
										</div>
										<div className="flex gap-3">
											<Calendar className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
											<div>
												<p className="text-sm text-gray-600">Join Date</p>
												<p className="font-semibold">
													{new Date(user.joinDate).toLocaleDateString()}
												</p>
											</div>
										</div>
									</div>
									<Separator />
									<div className="flex gap-3">
										<MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
										<div>
											<p className="text-sm text-gray-600 mb-1">Address</p>
											<p className="font-semibold">{user.address.street}</p>
											<p className="text-gray-600">
												{user.address.city}, {user.address.state}{" "}
												{user.address.zip}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Orders Tab */}
						<TabsContent value="orders">
							<Card>
								<CardHeader>
									<CardTitle>Order History</CardTitle>
									<CardDescription>Recent orders by this user</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Order ID</TableHead>
												<TableHead>Date</TableHead>
												<TableHead>Total</TableHead>
												<TableHead>Status</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{user.recentOrders.map((order) => (
												<TableRow key={order.id}>
													<TableCell className="font-medium">
														<Link
															href={`/admin/orders/${order.id}`}
															className="text-blue-600 hover:underline"
														>
															{order.id}
														</Link>
													</TableCell>
													<TableCell>
														{new Date(order.date).toLocaleDateString()}
													</TableCell>
													<TableCell className="font-semibold">
														${order.total.toFixed(2)}
													</TableCell>
													<TableCell>
														<Badge
															className={
																order.status === "delivered"
																	? "bg-green-100 text-green-800"
																	: "bg-yellow-100 text-yellow-800"
															}
														>
															{order.status}
														</Badge>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Settings Tab */}
						<TabsContent value="settings">
							<Card>
								<CardHeader>
									<CardTitle>Account Settings</CardTitle>
									<CardDescription>
										Manage user account settings
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="role">User Role</Label>
											<Select defaultValue={user.role}>
												<SelectTrigger id="role">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="customer">Customer</SelectItem>
													<SelectItem value="seller">Seller</SelectItem>
													<SelectItem value="admin">Admin</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label htmlFor="status">Account Status</Label>
											<Select defaultValue={user.status}>
												<SelectTrigger id="status">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="active">Active</SelectItem>
													<SelectItem value="suspended">Suspended</SelectItem>
													<SelectItem value="pending">Pending</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="flex gap-2 pt-4">
											<Button type="submit">Save Changes</Button>
											<Button type="button" variant="outline">
												Cancel
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Stats & Actions */}
				<div className="space-y-6">
					{/* Stats Card */}
					<Card>
						<CardHeader>
							<CardTitle>Statistics</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<p className="text-sm text-gray-600">Total Orders</p>
								<p className="text-2xl font-bold">{user.stats.totalOrders}</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-600">Total Spent</p>
								<p className="text-2xl font-bold text-green-600">
									${user.stats.totalSpent.toFixed(2)}
								</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-600">Average Order</p>
								<p className="text-2xl font-bold">
									${user.stats.averageOrder.toFixed(2)}
								</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-600">Last Login</p>
								<p className="font-semibold">
									{new Date(user.lastLogin).toLocaleDateString()}
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Actions Card */}
					<Card>
						<CardHeader>
							<CardTitle>Actions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<Button className="w-full" variant="outline">
								Send Email
							</Button>
							<Button className="w-full" variant="outline">
								Reset Password
							</Button>
							{user.status === "active" ? (
								<Button className="w-full" variant="outline">
									Suspend Account
								</Button>
							) : (
								<Button className="w-full" variant="outline">
									Activate Account
								</Button>
							)}
							<Button className="w-full" variant="destructive">
								Delete Account
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
