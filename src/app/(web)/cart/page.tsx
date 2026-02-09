import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getCarts } from "@/modules/shared/services/carts/getCarts";
import Image from "next/image";
import { ICart } from "@/models/Cart";
import Increment from "@/components/cart/Increment";
import Decrement from "@/components/cart/Decrement";
import Remove from "@/components/cart/Remove";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

export const metadata = {
	title: "Shopping Cart - MediStore",
	description: "View and manage your shopping cart",
};

export default async function CartPage() {
	const { isAuthenticated } = await getSession();

	if (!isAuthenticated) {
		redirect("/login?redirect=/cart");
	}

	const { data: cartData } = await getCarts();
	const cartItems = cartData?.items || [];
	const subtotal = cartData?.subtotal || 0;

	// Calculate shipping: free if subtotal > 500, otherwise 50
	const shippingCost = subtotal > 500 ? 0 : subtotal > 0 ? 50 : 0;
	// Calculate tax: 5% of subtotal
	const tax = subtotal * 0.05;
	const total = subtotal + shippingCost + tax;

	return (
		<div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
			<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

			{cartItems.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
						<h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
						<p className="text-gray-600 mb-6">
							Add some medicines to get started
						</p>
						<Button asChild size="lg">
							<Link href="/shop">Continue Shopping</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4">
						{cartItems.map((item: ICart) => {
							const price =
								item.medicine.discountPrice > 0
									? item.medicine.discountPrice
									: item.medicine.price;

							return (
								<Card key={item.id}>
									<CardContent className="p-6">
										<div className="flex gap-4">
											{/* Medicine Image */}
											<div className="relative w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
												{item.medicine.imageUrl ? (
													<Image
														src={item.medicine.imageUrl}
														alt={item.medicine.name}
														fill
														className="object-cover"
													/>
												) : (
													<ShoppingCart className="w-8 h-8 text-gray-400" />
												)}
											</div>

											{/* Medicine Details */}
											<div className="flex-1">
												<div className="flex justify-between items-start mb-2">
													<div>
														<h3 className="font-semibold text-lg mb-1">
															{item.medicine.name}
														</h3>
														<p className="text-sm text-gray-500">
															{item.medicine.category.name}
														</p>
													</div>
													<Remove item={item} />
												</div>

												<div className="flex justify-between items-end">
													<div>
														<p className="text-2xl font-bold text-green-600">
															৳{price.toFixed(2)}
														</p>
														{item.medicine.discountPrice > 0 && (
															<p className="text-sm text-gray-400 line-through">
																৳{item.medicine.price.toFixed(2)}
															</p>
														)}
													</div>

													{/* Quantity Controls */}
													<div className="flex items-center border rounded-md">
														<Decrement item={item} />
														<span className="px-4 py-2 text-sm font-medium min-w-12 text-center">
															{item.quantity}
														</span>
														<Increment item={item} />
													</div>
												</div>

												{/* Stock Warning */}
												{item.medicine.stockQuantity < 10 && (
													<p className="text-sm text-orange-500 mt-2">
														Only {item.medicine.stockQuantity} left in stock
													</p>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>

					{/* Order Summary */}
					<div>
						<Card className="sticky top-24">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between">
									<span className="text-gray-600">
										Subtotal ({cartData?.totalQuantity} items)
									</span>
									<span className="font-semibold">৳{subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Shipping</span>
									<span className="font-semibold">
										{shippingCost === 0 ? (
											<span className="text-green-600">Free</span>
										) : (
											`৳${shippingCost.toFixed(2)}`
										)}
									</span>
								</div>
								{subtotal > 0 && subtotal <= 500 && (
									<p className="text-xs text-gray-500">
										Add ৳{(500 - subtotal).toFixed(2)} more for free shipping
									</p>
								)}
								<div className="flex justify-between">
									<span className="text-gray-600">Tax (5%)</span>
									<span className="font-semibold">৳{tax.toFixed(2)}</span>
								</div>
								<div className="border-t pt-4">
									<div className="flex justify-between text-lg font-bold">
										<span>Total</span>
										<span className="text-green-600">৳{total.toFixed(2)}</span>
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
