import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ReviewEmpty() {
	return (
		<Card>
			<CardContent className="flex flex-col items-center justify-center py-16">
				<div className="rounded-full bg-gray-100 p-6 mb-4">
					<MessageSquare className="w-12 h-12 text-gray-400" />
				</div>
				<h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
				<p className="text-gray-500 mb-6 text-center max-w-md">
					You haven&apos;t written any reviews yet. Purchase medicines and share
					your experience!
				</p>
				<Button asChild>
					<Link href="/shop">Browse Medicines</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
