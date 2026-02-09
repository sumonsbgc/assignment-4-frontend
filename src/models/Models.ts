import { User } from "better-auth/client";
import { IRoles } from "@/lib/roles";

export type IUser = User & {
	role: IRoles;
};

