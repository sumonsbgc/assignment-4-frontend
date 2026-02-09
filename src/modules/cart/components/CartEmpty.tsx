"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartEmpty() {
	return (
		<Card>
			<CardContent className="py-12 text-center">
				<ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
				<h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
				<p className="text-gray-600 mb-6">Add some medicines to get started</p>
				<Button asChild size="lg">
					<Link href="/shop">Continue Shopping</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
