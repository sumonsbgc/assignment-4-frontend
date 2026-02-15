"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";
import { deleteReviewAction } from "../actions";
import { ConfirmModal } from "@/modules/shared/modals";

export const useDeleteReview = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleDelete = (reviewId: string) => {
		aark.fire(
			<ConfirmModal
				title="Delete Review"
				description="Are you sure you want to delete this review? This action cannot be undone."
				confirmText="Delete"
				variant="danger"
				onConfirm={() => {
					startTransition(async () => {
						const result = await deleteReviewAction(reviewId);

						if (result.success) {
							aark.notification({
								title: "Deleted",
								text: result.message,
								type: "success",
							});
							aark.close();
							router.refresh();
						} else {
							aark.notification({
								title: "Error",
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

	return { handleDelete, isPending };
};
