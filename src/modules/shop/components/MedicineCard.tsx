import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import type { Medicine } from "../types";
import AddToCart from "./AddToCart";

interface MedicineCardProps {
	medicine: Medicine;
}

export default async function MedicineCard({ medicine }: MedicineCardProps) {
	return (
		<Card className="flex flex-col hover:shadow-lg transition-shadow">
			<Link href={`/shop/${medicine.id}`} className="cursor-pointer">
				<div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
					{medicine.imageUrl && medicine.imageUrl !== "" ? (
						<Image
							src={medicine.imageUrl || ""}
							alt={medicine.name}
							fill
							className="object-cover"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-6xl">
							💊
						</div>
					)}
					{medicine.stockQuantity < 10 && medicine.stockQuantity > 0 && (
						<span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
							Low Stock
						</span>
					)}
					{medicine.stockQuantity === 0 && (
						<span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
							Out of Stock
						</span>
					)}
					{medicine.isFeatured && (
						<span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
							Featured
						</span>
					)}
				</div>
				<CardHeader className="flex-1">
					<CardTitle className="text-lg line-clamp-2">
						{medicine.name}
					</CardTitle>
					{medicine.genericName && (
						<p className="text-sm text-gray-500">{medicine.genericName}</p>
					)}
					<CardDescription className="line-clamp-2">
						{medicine.description}
					</CardDescription>
				</CardHeader>
			</Link>
			<CardContent>
				<div className="space-y-3">
					{medicine.category && (
						<div className="text-xs text-gray-500">
							Category:{" "}
							<span className="font-medium">{medicine.category.name}</span>
						</div>
					)}
					{medicine.manufacturer && (
						<div className="text-xs text-gray-500">
							Manufacturer:{" "}
							<span className="font-medium">{medicine.manufacturer}</span>
						</div>
					)}
					<div className="flex items-center justify-between">
						<span className="text-2xl font-bold text-green-600">
							${medicine.price.toFixed(2)}
						</span>
						<span className="text-sm text-gray-500">
							Stock: {medicine.stockQuantity}
						</span>
					</div>
					<AddToCart medicine={medicine} />
				</div>
			</CardContent>
		</Card>
	);
}
