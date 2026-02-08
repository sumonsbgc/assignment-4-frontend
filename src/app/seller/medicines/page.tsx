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
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function SellerMedicinesPage() {
	// Mock medicines data - replace with actual data from API
	const medicines = [
		{
			id: 1,
			name: "Paracetamol 500mg",
			category: "Pain Relief",
			price: 5.99,
			stock: 150,
			status: "active",
		},
		{
			id: 2,
			name: "Vitamin C 1000mg",
			category: "Vitamins",
			price: 12.99,
			stock: 75,
			status: "active",
		},
		{
			id: 3,
			name: "Ibuprofen 200mg",
			category: "Pain Relief",
			price: 8.5,
			stock: 0,
			status: "out_of_stock",
		},
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return <Badge className="bg-green-100 text-green-800">Active</Badge>;
			case "out_of_stock":
				return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
			case "inactive":
				return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
			default:
				return <Badge>{status}</Badge>;
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Medicines</h1>
					<p className="text-gray-600">Manage your medicine inventory</p>
				</div>
				<Button asChild>
					<Link href="/seller/medicines/new">
						<Plus className="w-4 h-4 mr-2" />
						Add Medicine
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input placeholder="Search medicines..." className="pl-10" />
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
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
														View
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link href={`/seller/medicines/${medicine.id}/edit`}>
														<Edit className="w-4 h-4 mr-2" />
														Edit
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													<Trash2 className="w-4 h-4 mr-2" />
													Delete
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
