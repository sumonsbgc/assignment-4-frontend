export default function ShopSkeleton() {
	return (
		<section className="py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Filters Skeleton */}
					<aside className="lg:col-span-1">
						<div className="bg-white rounded-lg border p-6">
							<div className="h-7 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>

							{/* Search Skeleton */}
							<div className="mb-6">
								<div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
								<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
							</div>

							{/* Category Skeleton */}
							<div className="mb-6">
								<div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
								<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
							</div>

							{/* Price Range Skeleton */}
							<div className="mb-6">
								<div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
								<div className="flex gap-2">
									<div className="h-10 bg-gray-200 rounded flex-1 animate-pulse"></div>
									<div className="h-10 bg-gray-200 rounded flex-1 animate-pulse"></div>
								</div>
							</div>

							{/* Sort By Skeleton */}
							<div className="mb-6">
								<div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
								<div className="h-10 bg-gray-200 rounded animate-pulse"></div>
							</div>

							{/* Buttons Skeleton */}
							<div className="flex gap-2">
								<div className="h-10 bg-gray-200 rounded flex-1 animate-pulse"></div>
								<div className="h-10 bg-gray-200 rounded flex-1 animate-pulse"></div>
							</div>
						</div>
					</aside>

					{/* Medicines Grid Skeleton */}
					<div className="lg:col-span-3">
						{/* Results Count Skeleton */}
						<div className="mb-4">
							<div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
						</div>

						{/* Medicine Cards Skeleton */}
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{Array.from({ length: 6 }).map((_, index) => (
								<div
									key={index}
									className="bg-white border rounded-lg p-4 animate-pulse"
								>
									{/* Image Skeleton */}
									<div className="aspect-square bg-gray-200 rounded-md mb-4"></div>

									{/* Title Skeleton */}
									<div className="h-6 bg-gray-200 rounded mb-2"></div>
									<div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

									{/* Generic Name Skeleton */}
									<div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

									{/* Manufacturer Skeleton */}
									<div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>

									{/* Price and Stock Skeleton */}
									<div className="flex items-center justify-between mt-4">
										<div className="h-6 bg-gray-200 rounded w-20"></div>
										<div className="h-6 bg-gray-200 rounded w-16"></div>
									</div>

									{/* Button Skeleton */}
									<div className="h-10 bg-gray-200 rounded mt-4"></div>
								</div>
							))}
						</div>

						{/* Pagination Skeleton */}
						<div className="mt-8 flex justify-center items-center gap-4">
							<div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
							<div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
							<div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
