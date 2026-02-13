import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { StarRating } from "./StarRating";
import { DeleteReviewButton } from "./DeleteReviewButton";
import type { IReview } from "../types";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface UserReviewCardProps {
	review: IReview;
}

export function UserReviewCard({ review }: UserReviewCardProps) {
	return (
		<Card className="hover:shadow-md transition-shadow">
			<CardContent className="p-4">
				<div className="flex gap-4">
					{/* Medicine Image */}
					<div className="shrink-0">
						<div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
							{review.medicine?.imageUrl ? (
								<Image
									src={review.medicine.imageUrl}
									alt={review.medicine.name}
									fill
									className="object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-2xl">
									💊
								</div>
							)}
						</div>
					</div>

					{/* Review Content */}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2">
							<div>
								<Link
									href={`/shop/${review.medicine?.id}`}
									className="font-semibold text-sm hover:text-blue-600 transition-colors inline-flex items-center gap-1"
								>
									{review.medicine?.name}
									<ExternalLink className="w-3 h-3" />
								</Link>
								<div className="flex items-center gap-2 mt-1">
									{review.rating && (
										<StarRating rating={review.rating} size="sm" />
									)}
									<span className="text-xs text-gray-500">
										{dayjs(review.createdAt).fromNow()}
									</span>
								</div>
							</div>

							<DeleteReviewButton reviewId={review.id} />
						</div>

						{review.comment && (
							<p className="mt-2 text-sm text-gray-700 leading-relaxed">
								{review.comment}
							</p>
						)}

						{/* Replies count */}
						{review.replies && review.replies.length > 0 && (
							<p className="mt-2 text-xs text-gray-500">
								{review.replies.length}{" "}
								{review.replies.length === 1 ? "reply" : "replies"}
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
