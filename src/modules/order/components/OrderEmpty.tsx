"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function OrderEmpty() {
	return (
		<Card>
			<CardContent className="flex flex-col items-center justify-center py-16">
				<div className="rounded-full bg-gray-100 p-6 mb-4">
					<ShoppingBag className="w-12 h-12 text-gray-400" />
				</div>
				<h3 className="text-xl font-semibold mb-2">No orders yet</h3>
				<p className="text-gray-500 mb-6 text-center max-w-md">
					You haven&apos;t placed any orders yet. Start shopping to see your
					orders here.
				</p>
				<Button asChild>
					<Link href="/shop">Start Shopping</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
