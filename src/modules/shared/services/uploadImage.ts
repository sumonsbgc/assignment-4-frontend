"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";

type UploadFolder = "medicines" | "categories" | "users";

export type UploadResult = {
	success: boolean;
	message: string;
	data: {
		url: string;
		originalName: string;
		size: number;
		mimetype: string;
	} | null;
};

type UploadAPIResponse = {
	success: boolean;
	message: string;
	data: {
		url: string;
		originalName: string;
		size: number;
		mimetype: string;
	};
};

export const uploadImage = async (
	formData: FormData,
	folder: UploadFolder,
): Promise<UploadResult> => {
	try {
		const cookieStore = await cookies();
		const res = await api.post<UploadAPIResponse>(
			`/uploads/${folder}`,
			formData,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error || !res.data?.data) {
			// Extract error message from response body if available
			const errorMessage =
				(res.data as Record<string, unknown>)?.message ||
				res.error ||
				"Failed to upload image";
			const messageStr =
				typeof errorMessage === "string"
					? errorMessage
					: "Failed to upload image";
			return {
				success: false,
				message: messageStr.includes("HTTP")
					? "Unable to upload image. Please try again."
					: messageStr,
				data: null,
			};
		}

		return {
			success: true,
			message: "Image uploaded successfully",
			data: res.data.data,
		};
	} catch (error) {
		return {
			success: false,
			message: "Unable to upload image. Please try again.",
			data: null,
		};
	}
};
