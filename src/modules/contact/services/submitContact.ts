"use server";

import { api } from "@/api/Api";

export type ContactFormData = {
	name: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
};

export type SubmitContactResponse = {
	success: boolean;
	message: string;
};

export async function submitContact(
	data: ContactFormData,
): Promise<SubmitContactResponse> {
	try {
		const res = await api.post<{ data: unknown }>("/contacts", data);

		if (!res.success || res.error) {
			return {
				success: false,
				message: res.error || "Failed to send message",
			};
		}

		return {
			success: true,
			message: "Message sent successfully! We'll get back to you soon.",
		};
	} catch {
		return {
			success: false,
			message: "Something went wrong. Please try again later.",
		};
	}
}
