import { ReviewCard } from "./ReviewCard";
import type { IReview } from "../types";

interface ReviewListProps {
	reviews: IReview[];
	currentUserId?: string;
}

export function ReviewList({ reviews, currentUserId }: ReviewListProps) {
	if (reviews.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-500">No reviews yet. Be the first to review!</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{reviews.map((review) => (
				<ReviewCard
					key={review.id}
					review={review}
					currentUserId={currentUserId}
				/>
			))}
		</div>
	);
}
