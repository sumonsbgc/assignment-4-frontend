"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "./../validation/validation";
import { useForm } from "@tanstack/react-form";
import { auth } from "@/lib/auth-client";
import config from "@/lib/config";
import { getDashboardByRole } from "@/lib/roles";
import { login } from "../services/login";
import { aark } from "aark-react-modalify";

export const useLogin = () => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: loginSchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);
			const response = await login(value);

			console.log("Login Response", response);

			if (response.status && response.user) {
				aark.notification({
					title: "Login Successful",
					text: response.message,
					type: "success",
				});

				const dashboard = getDashboardByRole(response.user.role);
				router.replace(dashboard);
				router.refresh();
			} else {
				aark.notification({
					title: "Login Failed",
					text: response.message?.includes("HTTP")
						? "Invalid email or password. Please try again."
						: response.message ||
							"Invalid email or password. Please try again.",
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

	return { form, onGoogleLogin, message, isError, isGoogleLoading };
};
