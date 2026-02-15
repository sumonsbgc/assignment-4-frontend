"use client";
import config from "@/lib/config";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from "./../validation/validation";
import { useForm } from "@tanstack/react-form";
import { register } from "../services/register";
import { auth } from "@/lib/auth-client";
import { aark } from "aark-react-modalify";
import { Role } from "@/lib/roles";

export const useRegister = () => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			role: Role.CUSTOMER,
			password: "",
			confirmPassword: "",
		},
		validators: {
			onChange: registerSchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);
			const response = await register({
				...value,
				role: value.role as Role.CUSTOMER | Role.SELLER,
			});

			if (response.status) {
				aark.notification({
					title: "Registration Successful",
					text: response.message,
					type: "success",
				});

				router.push("/login");
			} else {
				aark.notification({
					title: "Registration Failed",
					text: response.message?.includes("HTTP") 
						? "Unable to create account. Please try again."
						: response.message || "Unable to create account. Please try again.",
					type: "error",
				});
				setIsError(true);
				setMessage(response.message);
			}
		},
	});

	const onGoogleLogin = async () => {
		if (isGoogleLoading) return;
		setIsGoogleLoading(true);
		try {
			const data = await auth.signIn.social({
				provider: "google",
				callbackURL: config.frontEndUrl,
			});
			console.log("Login with Google", data);
		} finally {
			setIsGoogleLoading(false);
		}
	};

	return {
		form,
		onGoogleLogin,
		message,
		isError,
		isGoogleLoading,
	};
};
