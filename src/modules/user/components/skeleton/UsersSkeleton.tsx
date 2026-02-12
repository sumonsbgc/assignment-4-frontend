import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const RowSkeleton = () => (
	<TableRow>
		<TableCell>
			<div className="space-y-1">
				<Skeleton className="h-4 w-28" />
				<Skeleton className="h-3 w-20" />
			</div>
		</TableCell>
		<TableCell>
			<Skeleton className="h-4 w-40" />
		</TableCell>
		<TableCell>
			<Skeleton className="h-6 w-18 rounded-full" />
		</TableCell>
		<TableCell>
			<Skeleton className="h-6 w-16 rounded-full" />
		</TableCell>
		<TableCell>
			<Skeleton className="h-4 w-24" />
		</TableCell>
		<TableCell className="text-right">
			<Skeleton className="h-8 w-8 rounded-md ml-auto" />
		</TableCell>
	</TableRow>
);

export const UsersSkeleton = () => {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div className="space-y-2">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-4 w-56" />
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Users</CardTitle>
						<Skeleton className="h-4 w-24" />
					</div>
					{/* Filter skeletons */}
					<div className="flex flex-col md:flex-row gap-4 mt-4">
						<Skeleton className="h-10 flex-1" />
						<Skeleton className="h-10 w-45" />
					</div>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Joined</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 8 }).map((_, i) => (
								<RowSkeleton key={i} />
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};
