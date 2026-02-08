"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditMedicinePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);

	// Mock medicine data - replace with actual data from API
	const medicine = {
		id: id,
		name: "Paracetamol 500mg",
		category: "pain-relief",
		description:
			"Effective pain relief and fever reduction medication. Fast-acting formula.",
		price: 5.99,
		stock: 150,
		sku: "MED-12345",
		manufacturer: "Pfizer",
		expiryDate: "2027-12-31",
		dosage:
			"Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
		warnings:
			"Do not exceed recommended dose. Consult doctor if pregnant or breastfeeding.",
		ingredients: "Paracetamol 500mg",
		image: "https://example.com/paracetamol.jpg",
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-4 mb-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/seller/medicines">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-3xl font-bold">Edit Medicine</h1>
					<p className="text-gray-600">Update the medicine details</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Medicine Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="name">Medicine Name *</Label>
								<Input
									id="name"
									defaultValue={medicine.name}
									placeholder="e.g., Paracetamol 500mg"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="category">Category *</Label>
								<Select defaultValue={medicine.category}>
									<SelectTrigger id="category">
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pain-relief">Pain Relief</SelectItem>
										<SelectItem value="vitamins">
											Vitamins & Supplements
										</SelectItem>
										<SelectItem value="antibiotics">Antibiotics</SelectItem>
										<SelectItem value="cold-flu">Cold & Flu</SelectItem>
										<SelectItem value="digestive">Digestive Health</SelectItem>
										<SelectItem value="skincare">Skincare</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description *</Label>
							<Textarea
								id="description"
								defaultValue={medicine.description}
								placeholder="Describe the medicine, its uses, and benefits..."
								rows={4}
								required
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="space-y-2">
								<Label htmlFor="price">Price ($) *</Label>
								<Input
									id="price"
									type="number"
									step="0.01"
									defaultValue={medicine.price}
									placeholder="0.00"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="stock">Stock Quantity *</Label>
								<Input
									id="stock"
									type="number"
									defaultValue={medicine.stock}
									placeholder="0"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="sku">SKU</Label>
								<Input
									id="sku"
									defaultValue={medicine.sku}
									placeholder="MED-12345"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="manufacturer">Manufacturer</Label>
								<Input
									id="manufacturer"
									defaultValue={medicine.manufacturer}
									placeholder="e.g., Pfizer"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="expiryDate">Expiry Date</Label>
								<Input
									id="expiryDate"
									type="date"
									defaultValue={medicine.expiryDate}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="dosage">Dosage Instructions</Label>
							<Textarea
								id="dosage"
								defaultValue={medicine.dosage}
								placeholder="e.g., Take 1-2 tablets every 4-6 hours as needed..."
								rows={3}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="warnings">Warnings & Precautions</Label>
							<Textarea
								id="warnings"
								defaultValue={medicine.warnings}
								placeholder="e.g., Do not exceed recommended dose. Consult doctor if pregnant..."
								rows={3}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="ingredients">Active Ingredients</Label>
							<Input
								id="ingredients"
								defaultValue={medicine.ingredients}
								placeholder="e.g., Paracetamol 500mg, Caffeine 65mg"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="image">Product Image URL</Label>
							<Input
								id="image"
								type="url"
								defaultValue={medicine.image}
								placeholder="https://example.com/image.jpg"
							/>
						</div>

						<div className="flex gap-4 pt-4">
							<Button type="submit" size="lg">
								Save Changes
							</Button>
							<Button type="button" variant="outline" size="lg" asChild>
								<Link href="/seller/medicines">Cancel</Link>
							</Button>
							<Button
								type="button"
								variant="destructive"
								size="lg"
								className="ml-auto"
							>
								Delete Medicine
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
