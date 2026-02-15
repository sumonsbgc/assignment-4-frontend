"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { aark } from "aark-react-modalify";
import { createReviewSchema } from "../validation";
import { createReviewAction } from "../actions";

export const useCreateReview = (medicineId: string) => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const form = useForm({
		defaultValues: {
			medicineId,
			rating: 5,
			comment: "",
		},
		validators: {
			onChange: createReviewSchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);

			const result = await createReviewAction(value);

			if (result.success) {
				aark.notification({
					title: "Review Submitted",
					text: "Thank you! Your review has been submitted successfully",
					type: "success",
				});
				form.reset();
				router.refresh();
			} else {
				aark.notification({
					title: "Submission Failed",
					text: "Unable to submit your review. Please try again.",
					type: "error",
				});
				setIsError(true);
				setMessage(result.message);
			}
		},
	});

	return { form, message, isError };
};
