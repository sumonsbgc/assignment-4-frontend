import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const StatsCardSkeleton = () => (
	<Card>
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<Skeleton className="h-4 w-24" />
			<Skeleton className="h-4 w-4" />
		</CardHeader>
		<CardContent>
			<Skeleton className="h-7 w-20 mb-1" />
			<Skeleton className="h-3 w-32" />
		</CardContent>
	</Card>
);

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
	<Card>
		<CardHeader>
			<Skeleton className="h-5 w-32" />
		</CardHeader>
		<CardContent className="space-y-3">
			{Array.from({ length: rows }).map((_, i) => (
				<div key={i} className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-5 w-16 rounded-full" />
					</div>
					<Skeleton className="h-4 w-16" />
				</div>
			))}
		</CardContent>
	</Card>
);

export const DashboardSkeleton = () => {
	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			{/* Header */}
			<div>
				<Skeleton className="h-8 w-48 mb-2" />
				<Skeleton className="h-4 w-72" />
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatsCardSkeleton />
				<StatsCardSkeleton />
				<StatsCardSkeleton />
				<StatsCardSkeleton />
			</div>

			{/* Content */}
			<div className="grid gap-4 md:grid-cols-2">
				<TableSkeleton rows={5} />
				<TableSkeleton rows={5} />
			</div>
		</div>
	);
};
