"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function MedicineCardSkeleton() {
	return (
		<Card className="animate-pulse">
			<div className="h-48 bg-gray-200 rounded-t-lg"></div>
			<CardHeader>
				<div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
				<div className="h-4 bg-gray-200 rounded w-1/2"></div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<div className="h-3 bg-gray-200 rounded w-full"></div>
					<div className="h-3 bg-gray-200 rounded w-2/3"></div>
					<div className="flex items-center justify-between">
						<div className="h-8 bg-gray-200 rounded w-20"></div>
						<div className="h-4 bg-gray-200 rounded w-16"></div>
					</div>
					<div className="h-10 bg-gray-200 rounded w-full"></div>
				</div>
			</CardContent>
		</Card>
	);
}
