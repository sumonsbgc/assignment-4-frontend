import { auth } from "@/lib/auth-client";
import { Role } from "@/lib/roles";

export type RegisterResponse = {
	status: boolean;
	message: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: Role;
	} | null;
};

export const register = async (body: {
	name: string;
	email: string;
	role: Role.CUSTOMER | Role.SELLER;
	password: string;
	confirmPassword: string;
}): Promise<RegisterResponse> => {
	try {
		const { data, error } = await auth.signUp.email(body);

		if (error) {
			return {
				status: false,
				message: error.message || "Registration failed",
				user: null,
			};
		}

		return {
			status: true,
			message: "Registration successful",
			user: data?.user
				? {
						id: data.user.id,
						name: data.user.name,
						email: data.user.email,
						role: ((data.user as { role?: string }).role ||
							Role.CUSTOMER) as Role,
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
