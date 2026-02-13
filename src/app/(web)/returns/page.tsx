import { RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
	{
		step: "1",
		title: "Contact Support",
		description:
			"Reach out to us within 48 hours of receiving your order via email or phone.",
	},
	{
		step: "2",
		title: "Provide Details",
		description:
			"Share your order ID, product details, and the reason for the return along with photos if applicable.",
	},
	{
		step: "3",
		title: "Return Pickup",
		description:
			"We will arrange a free pickup from your address within 2–3 business days.",
	},
	{
		step: "4",
		title: "Refund / Replacement",
		description:
			"Once we receive and verify the returned item, a refund or replacement will be processed within 5–7 business days.",
	},
];

export default function ReturnsPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero */}
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<RotateCcw className="h-12 w-12 mx-auto mb-4 text-green-200" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Return Policy
						</h1>
						<p className="text-xl text-green-100">
							Our hassle-free return process ensures your satisfaction
						</p>
					</div>
				</div>
			</section>

			{/* Return Process */}
			<section className="py-16">
				<div className="container mx-auto px-4 max-w-3xl">
					<h2 className="text-3xl font-bold text-center mb-8">
						How Returns Work
					</h2>
					<div className="grid sm:grid-cols-2 gap-6 mb-12">
						{steps.map((item) => (
							<Card key={item.step}>
								<CardContent className="p-6">
									<div className="flex items-center gap-3 mb-3">
										<span className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
											{item.step}
										</span>
										<h3 className="text-lg font-semibold">{item.title}</h3>
									</div>
									<p className="text-gray-600 text-sm">{item.description}</p>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Eligibility & Non-returnable */}
					<div className="space-y-8 prose prose-gray prose-lg">
						<h2>Eligibility</h2>
						<ul>
							<li>Product must be in its original, unopened packaging</li>
							<li>Return request must be raised within 48 hours of delivery</li>
							<li>
								Damaged, defective, or wrong items are always eligible for
								return
							</li>
							<li>Order must not be a final-sale or clearance item</li>
						</ul>

						<h2>Non-Returnable Items</h2>
						<ul>
							<li>Opened or used medicines for hygiene and safety reasons</li>
							<li>Temperature-sensitive products (vaccines, insulin, etc.)</li>
							<li>Products purchased on clearance or special promotions</li>
						</ul>

						<h2>Refund Timeline</h2>
						<p>
							Refunds are processed within 5–7 business days after we receive
							the returned product. The amount will be credited back to your
							original payment method. For Cash on Delivery orders, refunds will
							be transferred to your provided bank account or mobile wallet.
						</p>

						<h2>Need Help?</h2>
						<p>
							If you have questions about returns or need assistance, please
							contact us at{" "}
							<a
								href="mailto:support@medistore.com"
								className="text-green-600 hover:underline"
							>
								support@medistore.com
							</a>{" "}
							or call us at +880 1234-567890.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
