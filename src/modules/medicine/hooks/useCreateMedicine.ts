"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { aark } from "aark-react-modalify";
import { createMedicineSchema } from "../validation/medicineValidation";
import { createMedicine } from "../services/createMedicine";
import { getSlug } from "@/lib/utils";

type UseCreateMedicineProps = {
	onSuccess?: () => void;
	redirectPath?: string;
};

export const useCreateMedicine = ({
	onSuccess,
	redirectPath,
}: UseCreateMedicineProps = {}) => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			genericName: "",
			manufacturer: "",
			price: 0,
			discountPrice: 0,
			stockQuantity: 0,
			lowStockThreshold: 10,
			unit: "pcs",
			imageUrl: "",
			dosageForm: "",
			strength: "",
			packSize: "",
			requiresPrescription: false,
			expiryDate: "",
			ingredients: "",
			sideEffects: "",
			warnings: "",
			storage: "",
			categoryId: "",
		},
		validators: {
			onChange: createMedicineSchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);

			const medicineData = {
				name: value.name,
				slug: getSlug(value.name),
				description: value.description || undefined,
				genericName: value.genericName || undefined,
				manufacturer: value.manufacturer,
				price: value.price,
				discountPrice: value.discountPrice || undefined,
				stockQuantity: value.stockQuantity,
				lowStockThreshold: value.lowStockThreshold,
				unit: value.unit || "pcs",
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
			};

			const response = await createMedicine(medicineData);

			console.log("Create Medicine Response:", response);

			if (response.status && response.data) {
				aark.notification({
					title: "Medicine Created",
					text: `Medicine "${response.data.name}" has been created successfully`,
					type: "success",
				});

				form.reset();

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
					title: "Creation Failed",
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
