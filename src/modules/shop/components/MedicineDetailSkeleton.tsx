import React from "react";
import { Separator } from "@/components/ui/separator";

const MedicineDetailSkeleton = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Left: Image Section */}
				<div className="space-y-4">
					<div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden animate-pulse" />

					{/* Additional Images */}
					<div className="grid grid-cols-4 gap-2">
						{[...Array(4)].map((_, index) => (
							<div
								key={index}
								className="relative aspect-square bg-gray-200 rounded-md overflow-hidden animate-pulse"
							/>
						))}
					</div>
				</div>

				{/* Right: Product Info */}
				<div className="space-y-6">
					{/* Header */}
					<div>
						<div className="h-9 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
						<div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
						<div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
					</div>

					{/* Price */}
					<div className="space-y-2">
						<div className="flex items-baseline gap-3">
							<div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
							<div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
						</div>
						<div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
					</div>

					<Separator />

					{/* Product Details */}
					<div className="space-y-3">
						{[...Array(5)].map((_, index) => (
							<div key={index} className="flex justify-between">
								<div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
								<div className="h-5 bg-gray-200 rounded w-40 animate-pulse" />
							</div>
						))}
					</div>

					<Separator />

					{/* Add to Cart */}
					<div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse" />

					{/* Seller Info */}
					<div className="p-4 bg-gray-50 border rounded-lg">
						<div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse" />
						<div className="h-5 bg-gray-200 rounded w-48 mb-1 animate-pulse" />
						<div className="h-4 bg-gray-200 rounded w-56 animate-pulse" />
					</div>
				</div>
			</div>

			{/* Detailed Information */}
			<div className="mt-12 space-y-6">
				{/* Description */}
				<div>
					<div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
					<div className="space-y-2">
						<div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
						<div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
						<div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
					</div>
				</div>

				{/* Ingredients */}
				<div>
					<div className="h-8 bg-gray-200 rounded w-56 mb-4 animate-pulse" />
					<div className="space-y-2">
						<div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
						<div className="h-5 bg-gray-200 rounded w-5/6 animate-pulse" />
					</div>
				</div>

				{/* Side Effects & Warnings */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="p-6 border-2 border-orange-200 rounded-lg">
						<div className="h-7 bg-gray-200 rounded w-40 mb-4 animate-pulse" />
						<div className="space-y-2">
							<div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
							<div className="h-5 bg-gray-200 rounded w-4/5 animate-pulse" />
						</div>
					</div>
					<div className="p-6 border-2 border-red-200 rounded-lg">
						<div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
						<div className="space-y-2">
							<div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
							<div className="h-5 bg-gray-200 rounded w-4/5 animate-pulse" />
						</div>
					</div>
				</div>

				{/* Storage */}
				<div>
					<div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
					<div className="space-y-2 mb-4">
						<div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
						<div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse" />
					</div>
					<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
						<div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MedicineDetailSkeleton;
