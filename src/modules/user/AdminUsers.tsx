import { getUsers, prepareParams } from "./services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserList } from "./components/UserList";
import { UserFilters } from "./components/UserFilters";

const AdminUsers = async ({
	searchParams,
}: {
	searchParams: {
		role?: string;
		search?: string;
	};
}) => {
	const filterOptions = prepareParams(searchParams);
	const { users } = await getUsers(filterOptions);

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
							Total: {users.length} users
						</div>
					</div>
					<UserFilters basePath="/admin/users" />
				</CardHeader>

				<CardContent>
					<UserList users={users} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminUsers;
