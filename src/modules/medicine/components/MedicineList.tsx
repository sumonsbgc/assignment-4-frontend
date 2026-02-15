import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Medicine } from "../types";
import { Action } from "./Action";
import Image from "next/image";

const getStatusBadge = (medicine: Medicine) => {
	if (!medicine.isActive) {
		return <Badge variant="secondary">Inactive</Badge>;
	}
	if (medicine.stockQuantity === 0) {
		return <Badge variant="destructive">Out of Stock</Badge>;
	}
	if (medicine.stockQuantity <= medicine.lowStockThreshold) {
		return (
			<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
				Low Stock
			</Badge>
		);
	}
	return (
		<Badge className="bg-green-100 text-green-800 border-green-200">
			Active
		</Badge>
	);
};

export const MedicineList = ({ medicines }: { medicines: Medicine[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Image</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Stock</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{medicines.length === 0 ? (
					<TableRow>
						<TableCell colSpan={7} className="text-center py-8 text-gray-500">
							No medicines found. Add your first medicine to get started.
						</TableCell>
					</TableRow>
				) : (
					medicines.map((medicine) => (
						<TableRow key={medicine.id}>
							<TableCell>
								<div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
									{medicine.imageUrl ? (
										<Image
											src={medicine.imageUrl}
											alt={medicine.name}
											fill
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center text-xl">
											💊
										</div>
									)}
								</div>
							</TableCell>
							<TableCell className="font-medium">
								<div>
									<div>{medicine.name}</div>
									{medicine.genericName && (
										<div className="text-xs text-muted-foreground">
											{medicine.genericName}
										</div>
									)}
								</div>
							</TableCell>
							<TableCell className="text-gray-600">
								{medicine.category?.name || "—"}
							</TableCell>
							<TableCell>
								<div>
									<span className="font-semibold">
										${medicine.price.toFixed(2)}
									</span>
									{medicine.discountPrice && (
										<span className="text-xs text-green-600 ml-1">
											${medicine.discountPrice.toFixed(2)}
										</span>
									)}
								</div>
							</TableCell>
							<TableCell>
								<span
									className={
										medicine.stockQuantity === 0
											? "text-red-600 font-semibold"
											: medicine.stockQuantity <= medicine.lowStockThreshold
												? "text-yellow-600 font-semibold"
												: ""
									}
								>
									{medicine.stockQuantity}
								</span>
							</TableCell>
							<TableCell>{getStatusBadge(medicine)}</TableCell>
							<TableCell className="text-right">
								<Action medicine={medicine} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
