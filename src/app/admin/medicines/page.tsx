"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical, Eye, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function AdminMedicinesPage() {
	// Mock medicines data - replace with actual data from API
	const medicines = [
		{
			id: 1,
			name: "Paracetamol 500mg",
			seller: "MediCare Pharmacy",
			category: "Pain Relief",
			price: 5.99,
			stock: 150,
			status: "approved",
		},
		{
			id: 2,
			name: "Vitamin C 1000mg",
			seller: "HealthPlus Store",
			category: "Vitamins",
			price: 12.99,
			stock: 75,
			status: "approved",
		},
		{
			id: 3,
			name: "Ibuprofen 200mg",
			seller: "MediCare Pharmacy",
			category: "Pain Relief",
			price: 8.5,
			stock: 0,
			status: "pending",
		},
		{
			id: 4,
			name: "Aspirin 325mg",
			seller: "Wellness Pharmacy",
			category: "Pain Relief",
			price: 6.99,
			stock: 200,
			status: "rejected",
		},
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "approved":
				return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
			case "pending":
				return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
			case "rejected":
				return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
			default:
				return <Badge>{status}</Badge>;
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">All Medicines</h1>
					<p className="text-gray-600">
						Manage and approve medicines from all sellers
					</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input placeholder="Search medicines..." className="pl-10" />
						</div>
						<Select defaultValue="all">
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Seller</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{medicines.map((medicine) => (
								<TableRow key={medicine.id}>
									<TableCell className="font-medium">{medicine.name}</TableCell>
									<TableCell>{medicine.seller}</TableCell>
									<TableCell>{medicine.category}</TableCell>
									<TableCell>${medicine.price.toFixed(2)}</TableCell>
									<TableCell>
										<span
											className={
												medicine.stock === 0
													? "text-red-600 font-semibold"
													: medicine.stock < 50
														? "text-yellow-600 font-semibold"
														: ""
											}
										>
											{medicine.stock}
										</span>
									</TableCell>
									<TableCell>{getStatusBadge(medicine.status)}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreVertical className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link href={`/shop/${medicine.id}`}>
														<Eye className="w-4 h-4 mr-2" />
														View Details
													</Link>
												</DropdownMenuItem>
												{medicine.status === "pending" && (
													<>
														<DropdownMenuItem>
															<CheckCircle className="w-4 h-4 mr-2 text-green-600" />
															Approve
														</DropdownMenuItem>
														<DropdownMenuItem className="text-red-600">
															<XCircle className="w-4 h-4 mr-2" />
															Reject
														</DropdownMenuItem>
													</>
												)}
												{medicine.status === "approved" && (
													<DropdownMenuItem className="text-red-600">
														Suspend
													</DropdownMenuItem>
												)}
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
