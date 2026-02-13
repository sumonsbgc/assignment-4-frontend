import { getUsers, prepareParams } from "./services";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { UserList } from "./components/UserList";
import { UserFilters } from "./components/UserFilters";
import { UserPagination } from "./components/UserPagination";

const AdminUsers = async ({
	searchParams,
}: {
	searchParams: {
		page?: string;
		role?: string;
		status?: string;
		search?: string;
		sortBy?: string;
		sortOrder?: string;
	};
}) => {
	const filterOptions = prepareParams(searchParams);
	const { users, pagination } = await getUsers(filterOptions);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Users</h1>
					<p className="text-gray-600">Manage all platform users</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Users</CardTitle>
						<div className="text-sm text-gray-600">
							Total: {pagination?.total ?? 0} users
						</div>
					</div>
					<UserFilters basePath="/admin/users" />
				</CardHeader>

				<CardContent>
					<UserList users={users} />
				</CardContent>

				<CardFooter className="flex justify-end">
					{pagination && (
						<UserPagination pagination={pagination} basePath="/admin/users" />
					)}
				</CardFooter>
			</Card>
		</div>
	);
};

export default AdminUsers;
