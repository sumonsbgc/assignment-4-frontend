import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Eye } from "lucide-react";
import Link from "next/link";
import type { Medicine } from "../types";

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

export const AdminMedicineList = ({ medicines }: { medicines: Medicine[] }) => {
	return (
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
				{medicines.length === 0 ? (
					<TableRow>
						<TableCell colSpan={7} className="text-center py-8 text-gray-500">
							No medicines found.
						</TableCell>
					</TableRow>
				) : (
					medicines.map((medicine) => (
						<TableRow key={medicine.id}>
							<TableCell className="font-medium">
								<div className="flex items-center gap-2">
									<Pill className="w-4 h-4 text-gray-500" />
									<div>
										<div>{medicine.name}</div>
										{medicine.genericName && (
											<div className="text-xs text-muted-foreground">
												{medicine.genericName}
											</div>
										)}
									</div>
								</div>
							</TableCell>
							<TableCell>
								<div className="text-sm">
									<div className="font-medium">
										{medicine.seller?.name || "—"}
									</div>
									<div className="text-xs text-muted-foreground">
										{medicine.seller?.email || ""}
									</div>
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
								<Button variant="ghost" size="icon" asChild>
									<Link href={`/shop/${medicine.slug}`}>
										<Eye className="w-4 h-4" />
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
