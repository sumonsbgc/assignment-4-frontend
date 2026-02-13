import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { StarRating } from "./StarRating";
import { DeleteReviewButton } from "./DeleteReviewButton";
import type { IReview } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface ReviewCardProps {
	review: IReview;
	currentUserId?: string;
}

export function ReviewCard({ review, currentUserId }: ReviewCardProps) {
	const isOwner = currentUserId === review.userId;

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					{/* Avatar */}
					<div className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
						<User className="w-5 h-5 text-gray-500" />
					</div>

					{/* Content */}
					<div className="flex-1 min-w-0">
						<div className="flex items-center justify-between gap-2">
							<div>
								<span className="font-medium text-sm">{review.user.name}</span>
								{review.isVerified && (
									<span className="ml-2 text-xs text-green-600 font-medium">
										✓ Verified Purchase
									</span>
								)}
							</div>
							<div className="flex items-center gap-2">
								<span className="text-xs text-gray-500">
									{dayjs(review.createdAt).fromNow()}
								</span>
								{isOwner && (
									<DeleteReviewButton reviewId={review.id} size="sm" />
								)}
							</div>
						</div>

						{/* Rating */}
						{review.rating && (
							<div className="mt-1">
								<StarRating rating={review.rating} size="sm" />
							</div>
						)}

						{/* Comment */}
						{review.comment && (
							<p className="mt-2 text-sm text-gray-700 leading-relaxed">
								{review.comment}
							</p>
						)}

						{/* Replies */}
						{review.replies && review.replies.length > 0 && (
							<div className="mt-3 pl-4 border-l-2 border-gray-100 space-y-3">
								{review.replies.map((reply) => (
									<div key={reply.id} className="flex items-start gap-2">
										<div className="shrink-0 w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center">
											<User className="w-3.5 h-3.5 text-gray-400" />
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<span className="font-medium text-xs">
													{reply.user.name}
												</span>
												<span className="text-xs text-gray-400">
													{dayjs(reply.createdAt).fromNow()}
												</span>
											</div>
											{reply.comment && (
												<p className="mt-0.5 text-sm text-gray-600">
													{reply.comment}
												</p>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
