"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteReview } from "../hooks/useDeleteReview";

interface DeleteReviewButtonProps {
	reviewId: string;
	size?: "sm" | "default";
}

export function DeleteReviewButton({
	reviewId,
	size = "default",
}: DeleteReviewButtonProps) {
	const { handleDelete, isPending } = useDeleteReview();

	return (
		<Button
			variant="ghost"
			size="icon"
			className={
				size === "sm"
					? "h-7 w-7 text-gray-400 hover:text-red-500"
					: "h-8 w-8 text-gray-400 hover:text-red-500"
			}
			onClick={() => handleDelete(reviewId)}
			disabled={isPending}
		>
			<Trash2 className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
		</Button>
	);
}
