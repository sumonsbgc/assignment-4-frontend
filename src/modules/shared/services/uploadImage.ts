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
			return {
				success: false,
				message: res.error || "Failed to upload image",
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
			message:
				error instanceof Error ? error.message : "Failed to upload image",
			data: null,
		};
	}
};
