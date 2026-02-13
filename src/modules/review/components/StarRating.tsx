"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
	rating: number;
	maxRating?: number;
	size?: "sm" | "md" | "lg";
	interactive?: boolean;
	onChange?: (rating: number) => void;
}

const sizeMap = {
	sm: "w-3.5 h-3.5",
	md: "w-5 h-5",
	lg: "w-6 h-6",
};

export function StarRating({
	rating,
	maxRating = 5,
	size = "md",
	interactive = false,
	onChange,
}: StarRatingProps) {
	return (
		<div className="flex items-center gap-0.5">
			{Array.from({ length: maxRating }, (_, i) => {
				const starValue = i + 1;
				const isFilled = starValue <= rating;

				return (
					<button
						key={i}
						type="button"
						disabled={!interactive}
						onClick={() => interactive && onChange?.(starValue)}
						className={cn(
							"transition-colors",
							interactive ? "cursor-pointer hover:scale-110" : "cursor-default",
						)}
					>
						<Star
							className={cn(
								sizeMap[size],
								isFilled
									? "fill-yellow-400 text-yellow-400"
									: "fill-gray-200 text-gray-200",
							)}
						/>
					</button>
				);
			})}
		</div>
	);
}
