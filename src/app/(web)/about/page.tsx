import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Users, Award, Target, Zap } from "lucide-react";

export default function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
						<p className="text-xl text-green-100">
							Committed to providing quality healthcare solutions with trust and
							integrity
						</p>
					</div>
				</div>
			</section>

			{/* Our Story Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
							Our Story
						</h2>
						<div className="space-y-6 text-gray-700 leading-relaxed">
							<p className="text-lg">
								Founded with a mission to make quality healthcare accessible to
								everyone, our online pharmacy has been serving customers for
								years with dedication and care. We understand that health is
								wealth, and we&apos;re committed to being your trusted partner
								in your wellness journey.
							</p>
							<p className="text-lg">
								We started with a simple vision: to provide authentic medicines
								and healthcare products with the convenience of online shopping
								and the reliability of professional pharmacy services. Today,
								we&apos;ve grown to serve thousands of customers, but our core
								values remain the same.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
						<Card className="border-none shadow-lg">
							<CardContent className="pt-8 pb-8">
								<div className="flex items-center gap-3 mb-4">
									<div className="bg-green-100 p-3 rounded-full">
										<Target className="h-8 w-8 text-green-600" />
									</div>
									<h3 className="text-2xl font-bold">Our Mission</h3>
								</div>
								<p className="text-gray-700 leading-relaxed">
									To provide safe, authentic, and affordable medicines to
									everyone, everywhere. We aim to bridge the gap between
									healthcare needs and accessibility through technology and
									exceptional service.
								</p>
							</CardContent>
						</Card>

						<Card className="border-none shadow-lg">
							<CardContent className="pt-8 pb-8">
								<div className="flex items-center gap-3 mb-4">
									<div className="bg-teal-100 p-3 rounded-full">
										<Zap className="h-8 w-8 text-teal-600" />
									</div>
									<h3 className="text-2xl font-bold">Our Vision</h3>
								</div>
								<p className="text-gray-700 leading-relaxed">
									To become the most trusted online pharmacy platform,
									revolutionizing healthcare delivery through innovation,
									reliability, and customer-centric services that make a real
									difference in people&apos;s lives.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Core Values */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
						Our Core Values
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
						<div className="text-center">
							<div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
								<Shield className="h-10 w-10 text-green-600" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Authenticity</h3>
							<p className="text-gray-600">
								100% genuine medicines sourced directly from verified
								manufacturers and licensed distributors
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
								<Heart className="h-10 w-10 text-teal-600" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Care</h3>
							<p className="text-gray-600">
								We genuinely care about your health and wellbeing, treating
								every customer like family
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
								<Users className="h-10 w-10 text-emerald-600" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Trust</h3>
							<p className="text-gray-600">
								Building lasting relationships through transparency,
								reliability, and consistent quality service
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
								<Award className="h-10 w-10 text-green-600" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Excellence</h3>
							<p className="text-gray-600">
								Committed to the highest standards in product quality, customer
								service, and healthcare delivery
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-16 bg-linear-to-r from-green-600 to-teal-700 text-white">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl md:text-4xl font-bold mb-8">
							Why Choose Us
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div>
								<div className="text-5xl font-bold mb-2">10K+</div>
								<p className="text-green-100">Happy Customers</p>
							</div>
							<div>
								<div className="text-5xl font-bold mb-2">5K+</div>
								<p className="text-green-100">Quality Medicines</p>
							</div>
							<div>
								<div className="text-5xl font-bold mb-2">99%</div>
								<p className="text-green-100">Customer Satisfaction</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Commitment */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
							Our Commitment to You
						</h2>
						<Card className="border-none shadow-lg bg-linear-to-r from-green-50 to-teal-50">
							<CardContent className="py-10 px-8">
								<div className="space-y-4 text-gray-700">
									<p className="text-lg leading-relaxed">
										<strong className="text-green-700">
											Quality Assurance:
										</strong>{" "}
										Every product in our inventory undergoes strict quality
										checks to ensure you receive only the best.
									</p>
									<p className="text-lg leading-relaxed">
										<strong className="text-green-700">
											Professional Service:
										</strong>{" "}
										Our team of qualified pharmacists and healthcare
										professionals is always ready to assist you with expert
										advice.
									</p>
									<p className="text-lg leading-relaxed">
										<strong className="text-green-700">
											Privacy & Security:
										</strong>{" "}
										Your personal and medical information is protected with the
										highest security standards.
									</p>
									<p className="text-lg leading-relaxed">
										<strong className="text-green-700">Fast Delivery:</strong>{" "}
										We understand the importance of timely medication, and we
										ensure quick and reliable delivery to your doorstep.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
