"use client";

import { useTransition } from "react";
import { aark } from "aark-react-modalify";
import { deleteMedicineAction } from "../actions/medicine.actions";
import type { Medicine } from "../types";
import { ConfirmModal } from "@/modules/shared/modals";

export const useDeleteMedicine = () => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = (medicine: Medicine) => {
		aark.fire(
			<ConfirmModal
				title="Delete Medicine"
				description={
					<>
						Are you sure you want to delete <strong>{medicine.name}</strong>?
						This action cannot be undone.
					</>
				}
				confirmText="Delete"
				variant="danger"
				onConfirm={() => {
					startTransition(async () => {
						const result = await deleteMedicineAction(medicine.id);

						if (result.success) {
							aark.notification({
								title: "Medicine Deleted",
								text: result.message,
								type: "success",
							});
							aark.close();
						} else {
							aark.notification({
								title: "Delete Failed",
								text: result.message,
								type: "error",
							});
						}
					});
				}}
				onCancel={() => aark.close()}
			/>,
			{
				showCloseIcon: false,
				preventEscClose: false,
				preventOverlayClose: true,
			},
		);
	};

	return {
		handleDelete,
		isPending,
	};
};
