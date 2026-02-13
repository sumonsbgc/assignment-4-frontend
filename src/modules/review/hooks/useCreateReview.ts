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
					text: result.message,
					type: "success",
				});
				form.reset();
				router.refresh();
			} else {
				aark.notification({
					title: "Error",
					text: result.message,
					type: "error",
				});
				setIsError(true);
				setMessage(result.message);
			}
		},
	});

	return { form, message, isError };
};
