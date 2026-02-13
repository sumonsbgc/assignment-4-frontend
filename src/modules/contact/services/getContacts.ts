"use server";

import { cookies } from "next/headers";
import { api } from "@/api/Api";

export type Contact = {
	id: string;
	name: string;
	email: string;
	phone?: string | null;
	subject: string;
	message: string;
	status: string;
	createdAt: string;
	updatedAt: string;
};

export type ContactsResponse = {
	contacts: Contact[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export async function getContacts(params?: {
	page?: number;
	limit?: number;
	status?: string;
	search?: string;
}): Promise<ContactsResponse> {
	const cookieStore = await cookies();
	const queryParams: Record<string, string> = {};

	if (params?.page) queryParams.page = String(params.page);
	if (params?.limit) queryParams.limit = String(params.limit);
	if (params?.status) queryParams.status = params.status;
	if (params?.search) queryParams.search = params.search;

	const res = await api.get<{
		data: Contact[];
		pagination: ContactsResponse["pagination"];
	}>("/contacts", {
		headers: { Cookie: cookieStore.toString() },
		params: queryParams,
		next: { tags: ["Contacts"] },
	});

	return {
		contacts: res.data?.data || [],
		pagination: res.data?.pagination || {
			page: 1,
			limit: 10,
			total: 0,
			totalPages: 0,
		},
	};
}

export async function updateContactStatus(
	id: string,
	status: string,
): Promise<{ success: boolean; message: string }> {
	try {
		const cookieStore = await cookies();

		const res = await api.put<{ data: Contact }>(
			`/contacts/${id}/status`,
			{ status },
			{
				headers: { Cookie: cookieStore.toString() },
			},
		);

		if (!res.success || res.error) {
			return {
				success: false,
				message: res.error || "Failed to update status",
			};
		}

		return { success: true, message: "Status updated successfully" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
}

export async function deleteContactMessage(
	id: string,
): Promise<{ success: boolean; message: string }> {
	try {
		const cookieStore = await cookies();

		const res = await api.delete<unknown>(`/contacts/${id}`, undefined, {
			headers: { Cookie: cookieStore.toString() },
		});

		if (!res.success || res.error) {
			return {
				success: false,
				message: res.error || "Failed to delete message",
			};
		}

		return { success: true, message: "Message deleted successfully" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
}
