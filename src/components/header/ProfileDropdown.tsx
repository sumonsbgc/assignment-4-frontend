import Image from "next/image";
import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { getRoleMenuItems } from "@/routes/routes";
import { getImageUrl, getInitials } from "@/lib/utils";
import { IUser } from "@/models/Models";
import { Logout } from "./Logout";

const ProfileDropdown = ({ user }: { user: IUser }) => {
	const menuItems = getRoleMenuItems(user.role);
	const initials = getInitials(user?.name);
	const profileImage = getImageUrl(user?.image);

	console.log("Header Profile", user);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-10 w-10 rounded-full bg-primary text-primary-foreground overflow-hidden p-0"
				>
					{profileImage ? (
						<Image
							src={profileImage}
							alt={user.name}
							fill
							className="object-cover rounded-full"
						/>
					) : (
						initials
					)}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{menuItems.map((item) => (
					<DropdownMenuItem key={item.url} asChild>
						<Link href={item.url} className="cursor-pointer">
							<item.icon className="mr-2 h-4 w-4" />
							{item.title}
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<Logout />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
