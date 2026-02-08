export enum Role {
	CUSTOMER = "CUSTOMER",
	SELLER = "SELLER",
	ADMIN = "ADMIN",
}

export type IRoles = keyof typeof Role;
export type IRolesExcludeAdmin = Exclude<IRoles, "ADMIN">;

export const RoleLabels: Record<Role, string> = {
	[Role.CUSTOMER]: "Customer",
	[Role.SELLER]: "Seller",
	[Role.ADMIN]: "Admin",
};

export const Roles = (): IRolesExcludeAdmin[] => {
	return Object.values(Role).filter(
		(role) => role !== Role.ADMIN,
	) as IRolesExcludeAdmin[];
};

export const getDashboardByRole = (role: Role | string): string => {
	switch (role) {
		case Role.ADMIN:
			return "/admin/dashboard";
		case Role.SELLER:
			return "/seller/dashboard";
		case Role.CUSTOMER:
		default:
			return "/";
	}
};
