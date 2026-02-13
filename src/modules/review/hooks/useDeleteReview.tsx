"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";
import { deleteReviewAction } from "../actions";
import { Button } from "@/components/ui/button";

export const useDeleteReview = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleDelete = (reviewId: string) => {
		aark.fire(
			<DeleteConfirmModal
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

type DeleteConfirmModalProps = {
	onConfirm: () => void;
	onCancel: () => void;
};

const DeleteConfirmModal = ({
	onConfirm,
	onCancel,
}: DeleteConfirmModalProps) => {
	return (
		<div className="bg-white rounded-lg p-6 max-w-md relative z-100 shadow-lg">
			<h2 className="text-xl font-semibold mb-2">Delete Review</h2>
			<p className="text-gray-600 mb-6">
				Are you sure you want to delete this review? This action cannot be
				undone.
			</p>
			<div className="flex gap-3 justify-end relative z-101">
				<Button
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						onCancel();
					}}
					className="relative z-102 pointer-events-auto"
				>
					Cancel
				</Button>
				<Button
					variant="destructive"
					onClick={(e) => {
						e.stopPropagation();
						onConfirm();
					}}
					className="relative z-102 pointer-events-auto"
				>
					Delete
				</Button>
			</div>
		</div>
	);
};
