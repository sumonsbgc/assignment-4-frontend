import { Role } from "@/lib/roles";

// ─── Enums ──────────────────────────────────────────────
export { Role };

export enum UserStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	SUSPENDED = "SUSPENDED",
}

// ─── Core User ──────────────────────────────────────────
export interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	phone: string | null;
	image: string | null;
	status: string;
	emailVerified: boolean;
	createdAt: string;
	updatedAt: string;
}

// ─── Request Bodies ─────────────────────────────────────
export interface UpdateUserBody {
	name?: string;
	email?: string;
	phone?: string;
	image?: string;
	role?: Role;
	status?: UserStatus;
	emailVerified?: boolean;
}

// ─── Filters ────────────────────────────────────────────
export interface UserFilters {
	page?: number;
	limit?: number;
	role?: string;
	status?: string;
	search?: string;
	sortBy?: "name" | "email" | "createdAt";
	sortOrder?: "asc" | "desc";
}

// ─── Pagination ─────────────────────────────────────────
export interface PaginationData {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasMore: boolean;
}

// ─── API Responses ──────────────────────────────────────
export interface UsersAPIResponse {
	success: boolean;
	message: string;
	data: User[];
	pagination: PaginationData;
}

export interface SingleUserAPIResponse {
	success: boolean;
	message: string;
	data: User;
}

// ─── Service Return Types ───────────────────────────────
export interface GetUsersResponse {
	users: User[];
	pagination?: PaginationData;
}

export interface GetUserResponse {
	user: User | null;
}

export interface UpdateUserResponse {
	status: boolean;
	message: string;
	data: User | null;
}

export interface DeleteUserResponse {
	status: boolean;
	message: string;
}
