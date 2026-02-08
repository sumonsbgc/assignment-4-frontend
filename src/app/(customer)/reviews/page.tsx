"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ReviewsPage() {
	// Mock reviews data - replace with actual data from API
	const reviews = [
		{
			id: 1,
			productName: "Paracetamol 500mg",
			rating: 5,
			comment: "Great product! Works effectively and fast delivery.",
			date: "2026-02-01",
			helpful: 12,
		},
		{
			id: 2,
			productName: "Vitamin C 1000mg",
			rating: 4,
			comment: "Good quality, but packaging could be better.",
			date: "2026-01-28",
			helpful: 8,
		},
	];

	const renderStars = (rating: number) => {
		return (
			<div className="flex gap-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star
						key={star}
						className={`w-5 h-5 ${
							star <= rating
								? "fill-yellow-400 text-yellow-400"
								: "fill-gray-200 text-gray-200"
						}`}
					/>
				))}
			</div>
		);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">My Reviews</h1>
			</div>

			{reviews.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
						<h2 className="text-2xl font-semibold mb-2">No reviews yet</h2>
						<p className="text-gray-600 mb-6">
							Purchase products to leave reviews and help other customers
						</p>
						<Button asChild>
							<Link href="/shop">Start Shopping</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-6">
					{reviews.map((review) => (
						<Card key={review.id}>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<CardTitle className="text-xl mb-2">
											{review.productName}
										</CardTitle>
										<div className="flex items-center gap-4 mb-2">
											{renderStars(review.rating)}
											<span className="text-sm text-gray-600">
												{new Date(review.date).toLocaleDateString()}
											</span>
										</div>
									</div>
									<div className="flex gap-2">
										<Button variant="ghost" size="icon">
											<Edit className="w-4 h-4" />
										</Button>
										<Button variant="ghost" size="icon">
											<Trash2 className="w-4 h-4 text-red-600" />
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-gray-700 mb-4">{review.comment}</p>
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Button variant="ghost" size="sm">
										<ThumbsUp className="w-4 h-4 mr-1" />
										Helpful ({review.helpful})
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Pending Reviews Section */}
			<div className="mt-12">
				<h2 className="text-2xl font-bold mb-6">Pending Reviews</h2>
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Ibuprofen 200mg</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">Rating</label>
								<div className="flex gap-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<button
											key={star}
											type="button"
											className="hover:scale-110 transition-transform"
										>
											<Star className="w-8 h-8 text-gray-300 hover:text-yellow-400" />
										</button>
									))}
								</div>
							</div>
							<div>
								<label
									htmlFor="review"
									className="block text-sm font-medium mb-2"
								>
									Your Review
								</label>
								<Textarea
									id="review"
									placeholder="Share your experience with this product..."
									rows={4}
								/>
							</div>
							<div className="flex gap-2">
								<Button type="submit">Submit Review</Button>
								<Button type="button" variant="outline">
									Skip
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
