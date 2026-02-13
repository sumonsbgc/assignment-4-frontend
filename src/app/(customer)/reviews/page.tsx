import type { Metadata } from "next";
import { getUserReviews, UserReviewCard, ReviewEmpty } from "@/modules/review";

export const metadata: Metadata = {
	title: "My Reviews - MediStore",
	description: "View and manage your product reviews at MediStore",
};

export default async function ReviewsPage() {
	const { reviews, status } = await getUserReviews();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">My Reviews</h1>
				<p className="text-gray-600 mt-1">
					Manage your product reviews and ratings
				</p>
			</div>

			{!status || reviews.length === 0 ? (
				<ReviewEmpty />
			) : (
				<div className="space-y-4">
					{reviews.map((review) => (
						<UserReviewCard key={review.id} review={review} />
					))}
				</div>
			)}
		</div>
	);
}
