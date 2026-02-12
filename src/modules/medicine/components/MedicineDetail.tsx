import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Medicine } from "../types";
import dayjs from "dayjs";

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

type DetailRowProps = {
	label: string;
	value: React.ReactNode;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
	<div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2">
		<dt className="text-sm font-medium text-muted-foreground sm:w-44 shrink-0">
			{label}
		</dt>
		<dd className="text-sm">{value || "—"}</dd>
	</div>
);

type MedicineDetailProps = {
	medicine: Medicine;
	showSeller?: boolean;
};

export const MedicineDetail = ({
	medicine,
	showSeller = false,
}: MedicineDetailProps) => {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div>
					<h2 className="text-2xl font-bold">{medicine.name}</h2>
					{medicine.genericName && (
						<p className="text-muted-foreground">{medicine.genericName}</p>
					)}
				</div>
				<div className="flex items-center gap-2">
					{getStatusBadge(medicine)}
					{medicine.isFeatured && (
						<Badge className="bg-purple-100 text-purple-800 border-purple-200">
							Featured
						</Badge>
					)}
					{medicine.requiresPrescription && (
						<Badge className="bg-orange-100 text-orange-800 border-orange-200">
							Rx Required
						</Badge>
					)}
				</div>
			</div>

			{medicine.description && (
				<p className="text-gray-600">{medicine.description}</p>
			)}

			{/* Basic Info */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Basic Information</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="divide-y">
						<DetailRow label="Category" value={medicine.category?.name} />
						<DetailRow label="Manufacturer" value={medicine.manufacturer} />
						<DetailRow label="SKU" value={medicine.sku} />
						<DetailRow label="Dosage Form" value={medicine.dosageForm} />
						<DetailRow label="Strength" value={medicine.strength} />
						<DetailRow label="Pack Size" value={medicine.packSize} />
						<DetailRow label="Unit" value={medicine.unit} />
						{showSeller && (
							<DetailRow
								label="Seller"
								value={
									medicine.seller ? (
										<div>
											<span className="font-medium">
												{medicine.seller.name}
											</span>
											<span className="text-muted-foreground ml-2">
												({medicine.seller.email})
											</span>
										</div>
									) : (
										"—"
									)
								}
							/>
						)}
					</dl>
				</CardContent>
			</Card>

			{/* Pricing & Stock */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Pricing & Stock</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="divide-y">
						<DetailRow
							label="Price"
							value={
								<span className="font-semibold">
									${medicine.price.toFixed(2)}
								</span>
							}
						/>
						<DetailRow
							label="Discount Price"
							value={
								medicine.discountPrice ? (
									<span className="text-green-600 font-semibold">
										${medicine.discountPrice.toFixed(2)}
									</span>
								) : (
									"—"
								)
							}
						/>
						{medicine.discountPercentage && (
							<DetailRow
								label="Discount %"
								value={`${medicine.discountPercentage}%`}
							/>
						)}
						<DetailRow
							label="Stock Quantity"
							value={
								<span
									className={
										medicine.stockQuantity === 0
											? "text-red-600 font-semibold"
											: medicine.stockQuantity <= medicine.lowStockThreshold
												? "text-yellow-600 font-semibold"
												: "font-semibold"
									}
								>
									{medicine.stockQuantity}
								</span>
							}
						/>
						<DetailRow
							label="Low Stock Threshold"
							value={medicine.lowStockThreshold}
						/>
					</dl>
				</CardContent>
			</Card>

			{/* Medical Details */}
			{(medicine.ingredients ||
				medicine.sideEffects ||
				medicine.warnings ||
				medicine.storage) && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Medical Details</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="divide-y">
							{medicine.ingredients && (
								<DetailRow
									label="Active Ingredients"
									value={medicine.ingredients}
								/>
							)}
							{medicine.sideEffects && (
								<DetailRow label="Side Effects" value={medicine.sideEffects} />
							)}
							{medicine.warnings && (
								<DetailRow
									label="Warnings & Precautions"
									value={medicine.warnings}
								/>
							)}
							{medicine.storage && (
								<DetailRow
									label="Storage Instructions"
									value={medicine.storage}
								/>
							)}
						</dl>
					</CardContent>
				</Card>
			)}

			{/* Dates */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Additional Info</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="divide-y">
						{medicine.expiryDate && (
							<DetailRow
								label="Expiry Date"
								value={dayjs(medicine.expiryDate).format("MMM DD, YYYY")}
							/>
						)}
						<DetailRow
							label="Created"
							value={dayjs(medicine.createdAt).format("MMM DD, YYYY h:mm A")}
						/>
						<DetailRow
							label="Last Updated"
							value={dayjs(medicine.updatedAt).format("MMM DD, YYYY h:mm A")}
						/>
					</dl>
				</CardContent>
			</Card>
		</div>
	);
};
