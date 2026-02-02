import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddToCart from "../components/AddToCart";
import type { Medicine } from "../types";

const Medicine = ({ medicine }: { medicine: Medicine }) => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Left: Image Section */}
				<div className="space-y-4">
					<div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
						{medicine.imageUrl ? (
							<Image
								src={medicine.imageUrl}
								alt={medicine.name}
								fill
								className="object-cover"
								priority
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-9xl">
								💊
							</div>
						)}
						{medicine.isFeatured && (
							<Badge className="absolute top-4 left-4 bg-green-600">
								Featured
							</Badge>
						)}
						{medicine.stockQuantity === 0 && (
							<Badge className="absolute top-4 right-4 bg-red-600">
								Out of Stock
							</Badge>
						)}
						{medicine.stockQuantity > 0 &&
							medicine.stockQuantity < medicine.lowStockThreshold && (
								<Badge className="absolute top-4 right-4 bg-orange-600">
									Low Stock
								</Badge>
							)}
					</div>

					{/* Additional Images */}
					{medicine.images && medicine.images.length > 0 && (
						<div className="grid grid-cols-4 gap-2">
							{medicine.images.map((img, index) => (
								<div
									key={index}
									className="relative aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
								>
									<Image
										src={img}
										alt={`${medicine.name} ${index + 1}`}
										fill
										className="object-cover"
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Right: Product Info */}
				<div className="space-y-6">
					{/* Header */}
					<div>
						<h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
						{medicine.genericName && (
							<p className="text-lg text-gray-600 mb-2">
								Generic: {medicine.genericName}
							</p>
						)}
						{medicine.category && (
							<Badge variant="outline" className="mb-4">
								{medicine.category.name}
							</Badge>
						)}
					</div>

					{/* Price */}
					<div className="space-y-2">
						<div className="flex items-baseline gap-3">
							{medicine.discountPrice ? (
								<>
									<span className="text-4xl font-bold text-green-600">
										${medicine.discountPrice.toFixed(2)}
									</span>
									<span className="text-2xl text-gray-400 line-through">
										${medicine.price.toFixed(2)}
									</span>
									<Badge className="bg-red-500">
										{medicine.discountPercentage}% OFF
									</Badge>
								</>
							) : (
								<span className="text-4xl font-bold text-green-600">
									${medicine.price.toFixed(2)}
								</span>
							)}
						</div>
						<p className="text-sm text-gray-600">
							Stock: {medicine.stockQuantity} {medicine.unit}
						</p>
					</div>

					<Separator />

					{/* Product Details */}
					<div className="space-y-3">
						{medicine.manufacturer && (
							<div className="flex justify-between">
								<span className="text-gray-600">Manufacturer:</span>
								<span className="font-medium">{medicine.manufacturer}</span>
							</div>
						)}
						{medicine.dosageForm && (
							<div className="flex justify-between">
								<span className="text-gray-600">Dosage Form:</span>
								<span className="font-medium capitalize">
									{medicine.dosageForm}
								</span>
							</div>
						)}
						{medicine.strength && (
							<div className="flex justify-between">
								<span className="text-gray-600">Strength:</span>
								<span className="font-medium">{medicine.strength}</span>
							</div>
						)}
						{medicine.packSize && (
							<div className="flex justify-between">
								<span className="text-gray-600">Pack Size:</span>
								<span className="font-medium">{medicine.packSize}</span>
							</div>
						)}
						{medicine.sku && (
							<div className="flex justify-between">
								<span className="text-gray-600">SKU:</span>
								<span className="font-medium text-sm">{medicine.sku}</span>
							</div>
						)}
						{medicine.requiresPrescription && (
							<Badge variant="destructive" className="w-full justify-center">
								⚠️ Requires Prescription
							</Badge>
						)}
					</div>

					<Separator />

					{/* Add to Cart */}
					<AddToCart medicine={medicine} />

					{/* Seller Info */}
					{medicine.seller && (
						<div className="p-4 bg-gray-50 border rounded-lg">
							<p className="text-sm text-gray-600 mb-2">Sold By</p>
							<p className="font-medium">{medicine.seller.name}</p>
							<p className="text-sm text-gray-600">{medicine.seller.email}</p>
						</div>
					)}
				</div>
			</div>

			{/* Detailed Information - No Tabs, Direct Display */}
			<div className="mt-12 space-y-6">
				{/* Description */}
				<div>
					<h2 className="text-2xl font-bold mb-4">Product Description</h2>
					<p className="text-gray-700 leading-relaxed">
						{medicine.description || "No description available."}
					</p>
				</div>

				{/* Ingredients */}
				{medicine.ingredients && (
					<div>
						<h2 className="text-2xl font-bold mb-4">Active Ingredients</h2>
						<p className="text-gray-700 leading-relaxed">
							{medicine.ingredients}
						</p>
					</div>
				)}

				{/* Side Effects & Warnings */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{medicine.sideEffects && (
						<div className="p-6 border-2 border-orange-200 rounded-lg">
							<h2 className="text-xl font-bold text-orange-600 flex items-center gap-2 mb-4">
								⚠️ Side Effects
							</h2>
							<p className="text-gray-700 leading-relaxed">
								{medicine.sideEffects}
							</p>
						</div>
					)}
					{medicine.warnings && (
						<div className="p-6 border-2 border-red-200 rounded-lg">
							<h2 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-4">
								🚨 Warnings
							</h2>
							<p className="text-gray-700 leading-relaxed">
								{medicine.warnings}
							</p>
						</div>
					)}
				</div>

				{/* Storage */}
				<div>
					<h2 className="text-2xl font-bold mb-4">Storage Instructions</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						{medicine.storage || "Store in a cool, dry place."}
					</p>
					{medicine.expiryDate && (
						<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
							<p className="text-sm">
								<span className="font-medium">Expiry Date: </span>
								{new Date(medicine.expiryDate).toLocaleDateString()}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Medicine;
