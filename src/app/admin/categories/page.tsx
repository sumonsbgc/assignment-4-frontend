"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Plus, MoreVertical, Edit, Trash2, Layers } from "lucide-react";
import { useState } from "react";

export default function AdminCategoriesPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Mock categories data - replace with actual data from API
	const categories = [
		{
			id: 1,
			name: "Pain Relief",
			description: "Medicines for pain management and relief",
			productCount: 45,
		},
		{
			id: 2,
			name: "Vitamins & Supplements",
			description: "Nutritional supplements and vitamins",
			productCount: 78,
		},
		{
			id: 3,
			name: "Antibiotics",
			description: "Prescription antibiotics and antimicrobials",
			productCount: 32,
		},
		{
			id: 4,
			name: "Cold & Flu",
			description: "Cold and flu medications",
			productCount: 56,
		},
		{
			id: 5,
			name: "Digestive Health",
			description: "Digestive system medications and supplements",
			productCount: 41,
		},
	];

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Categories</h1>
					<p className="text-gray-600">Manage product categories</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="w-4 h-4 mr-2" />
							Add Category
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Category</DialogTitle>
							<DialogDescription>
								Create a new category for medicines
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="categoryName">Category Name</Label>
								<Input id="categoryName" placeholder="e.g., Pain Relief" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="categoryDescription">Description</Label>
								<Input
									id="categoryDescription"
									placeholder="Brief description of the category"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setIsDialogOpen(false)}>
								Create Category
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>All Categories</CardTitle>
						<div className="text-sm text-gray-600">
							Total: {categories.length} categories
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Products</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories.map((category) => (
								<TableRow key={category.id}>
									<TableCell className="font-medium">
										<div className="flex items-center gap-2">
											<Layers className="w-4 h-4 text-gray-500" />
											{category.name}
										</div>
									</TableCell>
									<TableCell className="text-gray-600">
										{category.description}
									</TableCell>
									<TableCell>
										<span className="font-semibold">
											{category.productCount}
										</span>
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreVertical className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>
													<Edit className="w-4 h-4 mr-2" />
													Edit
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
