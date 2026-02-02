import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import { GetMedicineResponse, Medicine } from "../types";

export const getMedicine = async ({
	medicineId,
}: {
	medicineId: string;
}): Promise<GetMedicineResponse> => {
	try {
		const url = `/medicines/${medicineId}`;
		const response = await api.get<GetMedicineResponse>(url, {
			next: { revalidate: 720, tags: [CacheTags.Medicine] }, // Revalidate every 720 seconds
		});

		if (!response.data) {
			throw new Error("No data received from API");
		}

		const { data: medicine, success } = response.data;

		return {
			data: medicine,
			success,
		};
	} catch (error) {
		console.error("Error fetching medicine:", error);
		return {
			success: false,
			data: {} as Medicine,
		};
	}
};
