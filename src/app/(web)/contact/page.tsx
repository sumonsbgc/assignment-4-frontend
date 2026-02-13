import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/modules/contact";

export default function ContactPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
						<p className="text-xl text-green-100">
							Get in touch with us. We&apos;re here to help!
						</p>
					</div>
				</div>
			</section>

			{/* Contact Form and Info Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
						{/* Dynamic Contact Form */}
						<ContactForm />

						{/* Contact Information */}
						<div className="space-y-6">
							<div>
								<h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
								<p className="text-gray-600 mb-8">
									We&apos;re here to answer any questions you may have about our
									products and services.
								</p>
							</div>

							<Card>
								<CardContent className="pt-6">
									<div className="space-y-6">
										<div className="flex gap-4">
											<div className="shrink-0">
												<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
													<Phone className="w-6 h-6 text-green-600" />
												</div>
											</div>
											<div>
												<h3 className="font-semibold mb-1">Phone</h3>
												<p className="text-gray-600">+880 1234-567890</p>
												<p className="text-gray-600">+880 1987-654321</p>
											</div>
										</div>

										<div className="flex gap-4">
											<div className="shrink-0">
												<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
													<Mail className="w-6 h-6 text-blue-600" />
												</div>
											</div>
											<div>
												<h3 className="font-semibold mb-1">Email</h3>
												<p className="text-gray-600">support@medistore.com</p>
												<p className="text-gray-600">info@medistore.com</p>
											</div>
										</div>

										<div className="flex gap-4">
											<div className="shrink-0">
												<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
													<MapPin className="w-6 h-6 text-purple-600" />
												</div>
											</div>
											<div>
												<h3 className="font-semibold mb-1">Address</h3>
												<p className="text-gray-600">
													123 Pharmacy Street,
													<br />
													Medical District,
													<br />
													Dhaka 1205, Bangladesh
												</p>
											</div>
										</div>

										<div className="flex gap-4">
											<div className="shrink-0">
												<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
													<Clock className="w-6 h-6 text-orange-600" />
												</div>
											</div>
											<div>
												<h3 className="font-semibold mb-1">Business Hours</h3>
												<p className="text-gray-600">
													Saturday – Thursday: 9:00 AM – 8:00 PM
												</p>
												<p className="text-gray-600">
													Friday: 10:00 AM – 6:00 PM
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Teaser */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-4">
							Frequently Asked Questions
						</h2>
						<p className="text-gray-600 mb-8">
							Have questions? Check out our FAQ section for quick answers to
							common queries.
						</p>
						<Link href="/faq">
							<Button variant="outline" size="lg">
								View FAQs
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
