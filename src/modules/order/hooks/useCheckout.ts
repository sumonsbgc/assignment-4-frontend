"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { aark } from "aark-react-modalify";
import { checkoutSchema } from "../validation/validation";
import { createOrder } from "../services/createOrder";

export const useCheckout = () => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const form = useForm({
		defaultValues: {
			shippingAddress: "",
			city: "",
			state: "",
			zipCode: "",
			country: "Bangladesh",
			phone: "",
			notes: "",
			paymentMethod: "COD",
		},
		validators: {
			onChange: checkoutSchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);

			const response = await createOrder(value);

			if (response.status && response.data) {
				aark.notification({
					title: "Order Placed Successfully",
					text: `Order #${response.data.orderNumber} has been placed`,
					type: "success",
				});

				router.push(`/orders/${response.data.id}`);
			} else {
				aark.notification({
					title: "Order Failed",
					text: response.message,
					type: "error",
				});
				setIsError(true);
				setMessage(response.message);
			}
		},
	});

	return { form, message, isError };
};
