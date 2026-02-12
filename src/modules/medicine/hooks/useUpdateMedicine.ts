"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { aark } from "aark-react-modalify";
import { updateMedicineSchema } from "../validation/medicineValidation";
import { updateMedicine } from "../services/updateMedicine";
import type { Medicine } from "../types";
import { getSlug } from "@/lib/utils";

type UseUpdateMedicineProps = {
	medicine: Medicine;
	onSuccess?: () => void;
	redirectPath?: string;
};

export const useUpdateMedicine = ({
	medicine,
	onSuccess,
	redirectPath,
}: UseUpdateMedicineProps) => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const form = useForm({
		defaultValues: {
			name: medicine.name,
			description: medicine.description || "",
			genericName: medicine.genericName || "",
			manufacturer: medicine.manufacturer,
			price: medicine.price,
			discountPrice: medicine.discountPrice || 0,
			stockQuantity: medicine.stockQuantity,
			lowStockThreshold: medicine.lowStockThreshold,
			unit: medicine.unit,
			imageUrl: medicine.imageUrl || "",
			dosageForm: medicine.dosageForm || "",
			strength: medicine.strength || "",
			packSize: medicine.packSize || "",
			requiresPrescription: medicine.requiresPrescription,
			expiryDate: medicine.expiryDate
				? new Date(medicine.expiryDate).toISOString().split("T")[0]
				: "",
			ingredients: medicine.ingredients || "",
			sideEffects: medicine.sideEffects || "",
			warnings: medicine.warnings || "",
			storage: medicine.storage || "",
			categoryId: medicine.categoryId,
			isActive: medicine.isActive,
			isFeatured: medicine.isFeatured,
		},
		validators: {
			onChange: updateMedicineSchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);

			const medicineData = {
				name: value.name || undefined,
				slug: getSlug(value.name) || undefined,
				description: value.description || undefined,
				genericName: value.genericName || undefined,
				manufacturer: value.manufacturer || undefined,
				price: value.price,
				discountPrice: value.discountPrice || undefined,
				stockQuantity: value.stockQuantity,
				lowStockThreshold: value.lowStockThreshold,
				unit: value.unit || undefined,
				imageUrl: value.imageUrl || undefined,
				dosageForm: value.dosageForm || undefined,
				strength: value.strength || undefined,
				packSize: value.packSize || undefined,
				requiresPrescription: value.requiresPrescription,
				expiryDate: value.expiryDate || undefined,
				ingredients: value.ingredients || undefined,
				sideEffects: value.sideEffects || undefined,
				warnings: value.warnings || undefined,
				storage: value.storage || undefined,
				categoryId: value.categoryId,
				isActive: value.isActive,
				isFeatured: value.isFeatured,
			};

			const response = await updateMedicine(medicine.id, medicineData);

			if (response.status && response.data) {
				aark.notification({
					title: "Medicine Updated",
					text: `Medicine "${response.data.name}" has been updated successfully`,
					type: "success",
				});

				if (onSuccess) {
					onSuccess();
				}

				if (redirectPath) {
					router.push(redirectPath);
				} else {
					router.refresh();
				}
			} else {
				aark.notification({
					title: "Update Failed",
					text: response.message,
					type: "error",
				});
				setIsError(true);
				setMessage(response.message);
			}
		},
	});

	return {
		form,
		message,
		isError,
	};
};
