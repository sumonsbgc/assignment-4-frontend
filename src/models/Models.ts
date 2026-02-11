import { User } from "better-auth/client";
import { IRoles } from "@/lib/roles";

export type IUser = User & {
	role: IRoles;
};

export type ICategory = {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	image: string | null;
	isActive: boolean;
	order: number;
	parentId: string | null;
	parent: {
		id: string;
		name: string;
		slug: string;
	} | null;
	children: {
		id: string;
		name: string;
		slug: string;
		isActive: boolean;
	}[];
	_count: {
		medicines: number;
	};
	createdAt: string;
	updatedAt: string;
};
