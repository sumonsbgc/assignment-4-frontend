import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
			<div className="flex items-center gap-2">
				<Skeleton className="h-4 w-4 rounded" />
				<div className="space-y-1">
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-3 w-20" />
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div className="space-y-1">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-3 w-32" />
			</div>
		</TableCell>
		<TableCell>
			<Skeleton className="h-4 w-20" />
		</TableCell>
		<TableCell>
			<Skeleton className="h-4 w-16" />
		</TableCell>
		<TableCell>
			<Skeleton className="h-4 w-10" />
		</TableCell>
		<TableCell>
			<Skeleton className="h-6 w-16 rounded-full" />
		</TableCell>
		<TableCell className="text-right">
			<Skeleton className="h-8 w-8 rounded-md ml-auto" />
		</TableCell>
	</TableRow>
);

export const AdminMedicinesSkeleton = () => {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div className="space-y-2">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-72" />
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>
							<Skeleton className="h-5 w-32" />
						</CardTitle>
						<Skeleton className="h-4 w-36" />
					</div>

					{/* Filters skeleton */}
					<div className="flex items-center gap-4 pt-2">
						<Skeleton className="h-10 flex-1 rounded-md" />
						<Skeleton className="h-10 w-36 rounded-md" />
						<Skeleton className="h-10 w-36 rounded-md" />
						<Skeleton className="h-10 w-36 rounded-md" />
					</div>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Seller</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead>Status</TableHead>
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

				<CardFooter className="flex justify-end">
					<div className="flex items-center gap-2">
						<Skeleton className="h-9 w-9 rounded-md" />
						<Skeleton className="h-9 w-9 rounded-md" />
						<Skeleton className="h-9 w-9 rounded-md" />
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};
