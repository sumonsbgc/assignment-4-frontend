"use client";

import { useTransition } from "react";
import { aark } from "aark-react-modalify";
import { deleteCategoryAction } from "../actions/category.actions";
import { ICategory } from "@/models/Models";
import { ConfirmModal } from "@/modules/shared/modals";

export const useDeleteCategory = () => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = (category: ICategory) => {
		aark.fire(
			<ConfirmModal
				title="Delete Category"
				description={
					<>
						Are you sure you want to delete <strong>{category.name}</strong>?
						This action cannot be undone.
					</>
				}
				confirmText="Delete"
				variant="danger"
				onConfirm={() => {
					startTransition(async () => {
						const result = await deleteCategoryAction(category.id);

						if (result.success) {
							aark.notification({
								title: "Category Deleted",
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
