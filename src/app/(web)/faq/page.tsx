import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
	{
		question: "How do I place an order?",
		answer:
			"Simply browse our catalog, add items to your cart, and proceed to checkout. You can pay using various payment methods available on the platform.",
	},
	{
		question: "Do I need a prescription to buy medicines?",
		answer:
			"Yes, prescription medicines require a valid prescription. Over-the-counter (OTC) medicines can be purchased without one. You can upload your prescription during checkout.",
	},
	{
		question: "How long does delivery take?",
		answer:
			"Standard delivery takes 3–5 business days. Express delivery is available in select areas and typically arrives within 1–2 business days.",
	},
	{
		question: "Can I cancel or modify my order?",
		answer:
			'You can cancel your order as long as it hasn\'t been shipped yet. Go to your Orders page and click the "Cancel Order" button on the order you wish to cancel.',
	},
	{
		question: "What payment methods do you accept?",
		answer:
			"We accept credit/debit cards, mobile banking (bKash, Nagad), and cash on delivery for eligible orders.",
	},
	{
		question: "How do I return a product?",
		answer:
			"If you receive a damaged or incorrect product, contact our support within 48 hours. We will arrange a return pickup and issue a full refund or replacement.",
	},
	{
		question: "Are the medicines genuine?",
		answer:
			"Absolutely. All medicines sold on MediStore are sourced directly from licensed manufacturers and verified distributors. Every product is quality-checked before dispatch.",
	},
	{
		question: "How can I track my order?",
		answer:
			"Once your order is shipped, you will receive a tracking link via email. You can also check your order status from the Orders section in your dashboard.",
	},
];

export default function FAQPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero */}
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<HelpCircle className="h-12 w-12 mx-auto mb-4 text-green-200" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Frequently Asked Questions
						</h1>
						<p className="text-xl text-green-100">
							Find answers to common questions about our services
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Content */}
			<section className="py-16">
				<div className="container mx-auto px-4 max-w-3xl">
					<Accordion type="single" collapsible className="w-full space-y-2">
						{faqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="border rounded-lg px-4"
							>
								<AccordionTrigger className="text-left font-medium">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-gray-600 leading-relaxed">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		</div>
	);
}
