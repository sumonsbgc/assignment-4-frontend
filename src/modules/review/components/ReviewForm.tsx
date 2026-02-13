"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { useCreateReview } from "../hooks/useCreateReview";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface ReviewFormProps {
	medicineId: string;
}

export function ReviewForm({ medicineId }: ReviewFormProps) {
	const { form } = useCreateReview(medicineId);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Write a Review</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					{/* Rating */}
					<form.Field name="rating">
						{(field) => (
							<Field>
								<FieldLabel>
									Your Rating <span className="text-red-500">*</span>
								</FieldLabel>
								<StarRating
									rating={field.state.value}
									interactive
									size="lg"
									onChange={(value) => field.handleChange(value)}
								/>
							</Field>
						)}
					</form.Field>

					{/* Comment */}
					<form.Field name="comment">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										Your Review <span className="text-red-500">*</span>
									</FieldLabel>
									<Textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Share your experience with this medicine..."
										rows={4}
									/>
									{isInvalid && field.state.meta.errors && (
										<FieldError
											className="text-destructive"
											errors={field.state.meta.errors}
										/>
									)}
									<p className="text-xs text-gray-500">
										{field.state.value.length}/1000 characters
									</p>
								</Field>
							);
						}}
					</form.Field>

					{/* Submit */}
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting}
								className="w-full sm:w-auto"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Submitting...
									</>
								) : (
									"Submit Review"
								)}
							</Button>
						)}
					</form.Subscribe>
				</form>
			</CardContent>
		</Card>
	);
}
