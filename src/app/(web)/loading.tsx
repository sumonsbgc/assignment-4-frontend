import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen">
			{/* Hero skeleton */}
			<Skeleton className="w-full h-64 md:h-80" />

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="space-y-4">
							<Skeleton className="h-48 w-full rounded-lg" />
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
							<Skeleton className="h-8 w-24" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
