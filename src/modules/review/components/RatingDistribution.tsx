import { StarRating } from "./StarRating";
import type { ReviewStats } from "../types";

interface RatingDistributionProps {
	stats: ReviewStats;
}

export function RatingDistribution({ stats }: RatingDistributionProps) {
	const { averageRating, totalReviews, ratingDistribution } = stats;

	return (
		<div className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50 rounded-lg">
			{/* Overall Rating */}
			<div className="flex flex-col items-center justify-center min-w-35">
				<span className="text-4xl font-bold text-gray-900">
					{averageRating.toFixed(1)}
				</span>
				<StarRating rating={Math.round(averageRating)} size="md" />
				<span className="text-sm text-gray-500 mt-1">
					{totalReviews} {totalReviews === 1 ? "review" : "reviews"}
				</span>
			</div>

			{/* Rating Bars */}
			<div className="flex-1 space-y-2">
				{[5, 4, 3, 2, 1].map((star) => {
					const count =
						ratingDistribution[star as keyof typeof ratingDistribution];
					const percentage =
						totalReviews > 0 ? (count / totalReviews) * 100 : 0;

					return (
						<div key={star} className="flex items-center gap-2">
							<span className="text-sm text-gray-600 w-3">{star}</span>
							<StarRating rating={1} maxRating={1} size="sm" />
							<div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
								<div
									className="h-full bg-yellow-400 rounded-full transition-all duration-300"
									style={{ width: `${percentage}%` }}
								/>
							</div>
							<span className="text-sm text-gray-500 w-8 text-right">
								{count}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
