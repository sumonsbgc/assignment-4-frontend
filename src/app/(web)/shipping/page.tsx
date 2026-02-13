import { Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const deliveryOptions = [
	{
		title: "Standard Delivery",
		time: "3–5 Business Days",
		cost: "৳50",
		description:
			"Available nationwide. Orders are processed within 24 hours of placement.",
	},
	{
		title: "Express Delivery",
		time: "1–2 Business Days",
		cost: "৳120",
		description:
			"Available in Dhaka, Chittagong, and Sylhet metro areas. Orders placed before 2 PM are shipped the same day.",
	},
	{
		title: "Free Shipping",
		time: "3–5 Business Days",
		cost: "Free",
		description:
			"Available on all orders over ৳1,000. Automatically applied at checkout.",
	},
];

export default function ShippingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero */}
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<Truck className="h-12 w-12 mx-auto mb-4 text-green-200" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Shipping Policy
						</h1>
						<p className="text-xl text-green-100">
							Everything you need to know about our delivery process
						</p>
					</div>
				</div>
			</section>

			{/* Delivery Options */}
			<section className="py-16">
				<div className="container mx-auto px-4 max-w-3xl">
					<h2 className="text-3xl font-bold text-center mb-8">
						Delivery Options
					</h2>
					<div className="grid gap-6">
						{deliveryOptions.map((option) => (
							<Card key={option.title}>
								<CardContent className="p-6">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
										<h3 className="text-xl font-semibold">{option.title}</h3>
										<div className="flex items-center gap-3">
											<span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
												{option.time}
											</span>
											<span className="text-sm font-bold text-green-600">
												{option.cost}
											</span>
										</div>
									</div>
									<p className="text-gray-600">{option.description}</p>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Additional Info */}
					<div className="mt-12 space-y-8 prose prose-gray prose-lg">
						<h2>Order Processing</h2>
						<p>
							Orders are processed Monday through Saturday, 9 AM – 6 PM (BST).
							Orders placed on Sundays or public holidays will be processed on
							the next business day.
						</p>

						<h2>Tracking Your Order</h2>
						<p>
							Once your order is shipped, you will receive a confirmation email
							with a tracking number. You can also track your order status from
							the Orders section in your dashboard.
						</p>

						<h2>Delivery Areas</h2>
						<p>
							We deliver across Bangladesh. Remote areas may require additional
							1–2 business days for delivery. We will notify you if your area
							has any delivery restrictions.
						</p>

						<h2>Missed Delivery</h2>
						<p>
							If you are not available at the time of delivery, our courier
							partner will attempt delivery up to 2 additional times. After 3
							failed attempts, the order will be returned and a refund will be
							processed.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
