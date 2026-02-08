import { auth } from "@/lib/auth-client";
import { Role } from "@/lib/roles";

export type LoginResponse = {
	status: boolean;
	message: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: Role;
	} | null;
};

export const login = async (body: {
	email: string;
	password: string;
}): Promise<LoginResponse> => {
	try {
		const { data, error } = await auth.signIn.email(body);

		if (error) {
			return {
				status: false,
				message: error.message || "Login failed",
				user: null,
			};
		}

		return {
			status: true,
			message: "Login successful",
			user: data?.user
				? {
						id: data.user.id,
						name: data.user.name,
						email: data.user.email,
						role: (data.user as { role?: string }).role as Role,
					}
				: null,
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Something went wrong",
			user: null,
		};
	}
};
