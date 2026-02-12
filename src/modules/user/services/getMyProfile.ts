import { getSession } from "@/lib/getSession";
import { getUserById } from "./getUserById";
import type { GetUserResponse } from "../types";

export const getMyProfile = async (): Promise<GetUserResponse> => {
	try {
		const { user: sessionUser, isAuthenticated } = await getSession();

		if (!isAuthenticated || !sessionUser?.id) {
			return { user: null };
		}

		return await getUserById(sessionUser.id);
	} catch (error) {
		console.error("Error fetching profile:", error);
		return { user: null };
	}
};
