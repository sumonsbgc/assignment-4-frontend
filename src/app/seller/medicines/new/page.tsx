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

export default function NewMedicinePage() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-4 mb-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/seller/medicines">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-3xl font-bold">Add New Medicine</h1>
					<p className="text-gray-600">
						Fill in the details to add a new medicine
					</p>
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
									placeholder="e.g., Paracetamol 500mg"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="category">Category *</Label>
								<Select>
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
									placeholder="0.00"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="stock">Stock Quantity *</Label>
								<Input id="stock" type="number" placeholder="0" required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="sku">SKU</Label>
								<Input id="sku" placeholder="MED-12345" />
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="manufacturer">Manufacturer</Label>
								<Input id="manufacturer" placeholder="e.g., Pfizer" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="expiryDate">Expiry Date</Label>
								<Input id="expiryDate" type="date" />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="dosage">Dosage Instructions</Label>
							<Textarea
								id="dosage"
								placeholder="e.g., Take 1-2 tablets every 4-6 hours as needed..."
								rows={3}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="warnings">Warnings & Precautions</Label>
							<Textarea
								id="warnings"
								placeholder="e.g., Do not exceed recommended dose. Consult doctor if pregnant..."
								rows={3}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="ingredients">Active Ingredients</Label>
							<Input
								id="ingredients"
								placeholder="e.g., Paracetamol 500mg, Caffeine 65mg"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="image">Product Image URL</Label>
							<Input
								id="image"
								type="url"
								placeholder="https://example.com/image.jpg"
							/>
						</div>

						<div className="flex gap-4 pt-4">
							<Button type="submit" size="lg">
								Add Medicine
							</Button>
							<Button type="button" variant="outline" size="lg" asChild>
								<Link href="/seller/medicines">Cancel</Link>
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
