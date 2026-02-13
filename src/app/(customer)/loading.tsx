import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-6">
				{/* Header skeleton */}
				<div className="flex items-center justify-between">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-10 w-32" />
				</div>

				{/* Cards skeleton */}
				<div className="space-y-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="flex items-center gap-4 border rounded-lg p-4"
						>
							<Skeleton className="h-16 w-16 rounded-lg" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
							</div>
							<Skeleton className="h-6 w-20 rounded-full" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
