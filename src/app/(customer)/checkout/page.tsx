"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, Building2 } from "lucide-react";

export default function CheckoutPage() {
	// Mock cart data
	const cartItems = [
		{ id: 1, name: "Paracetamol 500mg", price: 5.99, quantity: 2 },
		{ id: 2, name: "Vitamin C 1000mg", price: 12.99, quantity: 1 },
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
			<h1 className="text-3xl font-bold mb-8">Checkout</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Checkout Form */}
				<div className="lg:col-span-2 space-y-6">
					{/* Shipping Information */}
					<Card>
						<CardHeader>
							<CardTitle>Shipping Information</CardTitle>
						</CardHeader>
						<CardContent>
							<form className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input id="firstName" placeholder="John" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input id="lastName" placeholder="Doe" />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="john@example.com"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										type="tel"
										placeholder="+1 (555) 000-0000"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="address">Street Address</Label>
									<Input id="address" placeholder="123 Main Street" />
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="space-y-2">
										<Label htmlFor="city">City</Label>
										<Input id="city" placeholder="New York" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="state">State</Label>
										<Input id="state" placeholder="NY" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="zip">ZIP Code</Label>
										<Input id="zip" placeholder="10001" />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="notes">Delivery Notes (Optional)</Label>
									<Textarea
										id="notes"
										placeholder="Any special instructions..."
										rows={3}
									/>
								</div>
							</form>
						</CardContent>
					</Card>

					{/* Payment Method */}
					<Card>
						<CardHeader>
							<CardTitle>Payment Method</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup defaultValue="card" className="space-y-4">
								<div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
									<RadioGroupItem value="card" id="card" />
									<Label
										htmlFor="card"
										className="flex items-center gap-3 cursor-pointer flex-1"
									>
										<CreditCard className="w-5 h-5" />
										<span>Credit/Debit Card</span>
									</Label>
								</div>
								<div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
									<RadioGroupItem value="wallet" id="wallet" />
									<Label
										htmlFor="wallet"
										className="flex items-center gap-3 cursor-pointer flex-1"
									>
										<Wallet className="w-5 h-5" />
										<span>Digital Wallet</span>
									</Label>
								</div>
								<div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
									<RadioGroupItem value="bank" id="bank" />
									<Label
										htmlFor="bank"
										className="flex items-center gap-3 cursor-pointer flex-1"
									>
										<Building2 className="w-5 h-5" />
										<span>Bank Transfer</span>
									</Label>
								</div>
							</RadioGroup>

							<div className="mt-6 space-y-4">
								<div className="space-y-2">
									<Label htmlFor="cardNumber">Card Number</Label>
									<Input id="cardNumber" placeholder="1234 5678 9012 3456" />
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="expiry">Expiry Date</Label>
										<Input id="expiry" placeholder="MM/YY" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="cvv">CVV</Label>
										<Input
											id="cvv"
											placeholder="123"
											type="password"
											maxLength={3}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Order Summary */}
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								{cartItems.map((item) => (
									<div key={item.id} className="flex justify-between text-sm">
										<span className="text-gray-600">
											{item.name} x {item.quantity}
										</span>
										<span className="font-semibold">
											${(item.price * item.quantity).toFixed(2)}
										</span>
									</div>
								))}
							</div>
							<div className="border-t pt-4 space-y-2">
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Subtotal</span>
									<span className="font-semibold">${subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Shipping</span>
									<span className="font-semibold">${shipping.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Tax</span>
									<span className="font-semibold">${tax.toFixed(2)}</span>
								</div>
							</div>
							<div className="border-t pt-4">
								<div className="flex justify-between text-lg font-bold">
									<span>Total</span>
									<span className="text-green-600">${total.toFixed(2)}</span>
								</div>
							</div>
							<Button className="w-full" size="lg">
								Place Order
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
