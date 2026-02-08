"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
	// Mock cart data - replace with actual data from API
	const cartItems = [
		{
			id: 1,
			name: "Paracetamol 500mg",
			price: 5.99,
			quantity: 2,
			image: "/placeholder-medicine.jpg",
		},
		{
			id: 2,
			name: "Vitamin C 1000mg",
			price: 12.99,
			quantity: 1,
			image: "/placeholder-medicine.jpg",
		},
	];

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shipping = 5.0;
	const tax = subtotal * 0.1;
	const total = subtotal + shipping + tax;

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

			{cartItems.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
						<h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
						<p className="text-gray-600 mb-6">
							Add some medicines to get started
						</p>
						<Button asChild>
							<Link href="/shop">Continue Shopping</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4">
						{cartItems.map((item) => (
							<Card key={item.id}>
								<CardContent className="p-6">
									<div className="flex gap-4">
										<div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
											<ShoppingCart className="w-8 h-8 text-gray-400" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg mb-2">
												{item.name}
											</h3>
											<p className="text-2xl font-bold text-green-600">
												${item.price.toFixed(2)}
											</p>
										</div>
										<div className="flex flex-col items-end gap-4">
											<Button variant="ghost" size="icon">
												<Trash2 className="w-4 h-4 text-red-600" />
											</Button>
											<div className="flex items-center gap-2">
												<Button variant="outline" size="icon">
													<Minus className="w-4 h-4" />
												</Button>
												<Input
													type="number"
													value={item.quantity}
													className="w-16 text-center"
													readOnly
												/>
												<Button variant="outline" size="icon">
													<Plus className="w-4 h-4" />
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Order Summary */}
					<div>
						<Card>
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between">
									<span className="text-gray-600">Subtotal</span>
									<span className="font-semibold">${subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Shipping</span>
									<span className="font-semibold">${shipping.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Tax</span>
									<span className="font-semibold">${tax.toFixed(2)}</span>
								</div>
								<div className="border-t pt-4">
									<div className="flex justify-between text-lg font-bold">
										<span>Total</span>
										<span className="text-green-600">${total.toFixed(2)}</span>
									</div>
								</div>
								<Button className="w-full" size="lg" asChild>
									<Link href="/checkout">Proceed to Checkout</Link>
								</Button>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/shop">Continue Shopping</Link>
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}
