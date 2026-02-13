import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ShoppingCart,
	Shield,
	Truck,
	Clock,
	Heart,
	Users,
	Package,
	CheckCircle2,
	Star,
} from "lucide-react";
import { getCategories } from "@/modules/category/services/getCategories";
import { getMedicines } from "@/modules/medicine/services/getMedicines";
import Image from "next/image";

export default async function Home() {
	const [categoriesRes, featuredRes] = await Promise.all([
		getCategories({ limit: 6, isActive: true }),
		getMedicines({ limit: 6, isFeatured: true }),
	]);

	const categories = categoriesRes.data ?? [];
	const featuredMedicines = featuredRes.data ?? [];

	return (
		<div className="flex flex-col min-h-screen">
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-20 md:py-32">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Your Trusted Online Pharmacy
						</h1>
						<p className="text-xl md:text-2xl mb-8 text-green-100">
							Quality medicines delivered to your doorstep. Fast, reliable, and
							affordable healthcare solutions.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/shop" className="cursor-pointer">
								<Button
									size="lg"
									variant="secondary"
									className="text-lg px-8 cursor-pointer"
								>
									<ShoppingCart className="mr-2 h-5 w-5" />
									Shop Now
								</Button>
							</Link>
							<Link href="/register" className="cursor-pointer">
								<Button
									size="lg"
									variant="outline"
									className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-green-700 cursor-pointer"
								>
									Get Started
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Why Choose Us
						</h2>
						<p className="text-gray-600 text-lg max-w-2xl mx-auto">
							We provide the best healthcare solutions with customer
							satisfaction as our top priority
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
									<Shield className="h-8 w-8 text-green-600" />
								</div>
								<CardTitle>100% Authentic</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									All medicines are sourced directly from verified manufacturers
									and licensed distributors
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
									<Truck className="h-8 w-8 text-teal-600" />
								</div>
								<CardTitle>Fast Delivery</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Quick and reliable delivery service to ensure you get your
									medicines on time
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
									<Clock className="h-8 w-8 text-emerald-600" />
								</div>
								<CardTitle>24/7 Support</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Our customer support team is always available to help you with
									any queries
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
									<Heart className="h-8 w-8 text-teal-600" />
								</div>
								<CardTitle>Best Prices</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Competitive pricing with regular discounts and special offers
									on medicines
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Shop by Category
						</h2>
						<p className="text-gray-600 text-lg">
							Browse our wide range of medicine categories
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
						{categories.length > 0 ? (
							categories.map((category) => (
								<Link
									key={category.id}
									href={`/shop?categoryId=${category.id}`}
									className="cursor-pointer"
								>
									<Card className="hover:shadow-lg transition-shadow cursor-pointer text-center h-full">
										<CardContent className="pt-6 pb-6">
											{category.image ? (
												<div className="relative w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden">
													<Image
														src={category.image}
														alt={category.name}
														fill
														className="object-cover"
													/>
												</div>
											) : (
												<div className="text-4xl mb-2">💊</div>
											)}
											<p className="font-semibold text-sm">{category.name}</p>
										</CardContent>
									</Card>
								</Link>
							))
						) : (
							<p className="col-span-full text-center text-gray-500">
								No categories available
							</p>
						)}
					</div>
				</div>
			</section>

			{/* Featured Medicines Section */}
			{featuredMedicines.length > 0 && (
				<section className="py-16 bg-gray-50">
					<div className="container mx-auto px-4">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Featured Medicines
							</h2>
							<p className="text-gray-600 text-lg">
								Discover our most popular and recommended products
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{featuredMedicines.map((medicine) => (
								<Link
									key={medicine.id}
									href={`/shop/${medicine.id}`}
									className="cursor-pointer"
								>
									<Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
										<CardContent className="p-0">
											<div className="relative h-48 bg-gray-100">
												{medicine.imageUrl ? (
													<Image
														src={medicine.imageUrl}
														alt={medicine.name}
														fill
														className="object-cover rounded-t-lg"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center text-5xl">
														💊
													</div>
												)}
												{medicine.discountPercentage && (
													<span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
														{medicine.discountPercentage}% OFF
													</span>
												)}
											</div>
											<div className="p-4">
												<h3 className="font-semibold text-lg mb-1 line-clamp-1">
													{medicine.name}
												</h3>
												<p className="text-sm text-gray-500 mb-2">
													{medicine.manufacturer}
												</p>
												<div className="flex items-center gap-2">
													{medicine.discountPrice ? (
														<>
															<span className="text-lg font-bold text-green-600">
																৳{medicine.discountPrice}
															</span>
															<span className="text-sm text-gray-400 line-through">
																৳{medicine.price}
															</span>
														</>
													) : (
														<span className="text-lg font-bold text-green-600">
															৳{medicine.price}
														</span>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
						<div className="text-center mt-8">
							<Link href="/shop">
								<Button size="lg" variant="outline" className="cursor-pointer">
									View All Medicines
								</Button>
							</Link>
						</div>
					</div>
				</section>
			)}

			{/* How It Works Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							How It Works
						</h2>
						<p className="text-gray-600 text-lg">
							Simple steps to get your medicines delivered
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="text-center">
							<div className="mx-auto bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
								1
							</div>
							<h3 className="text-xl font-semibold mb-2">Search & Select</h3>
							<p className="text-gray-600">
								Browse our catalog and add medicines to your cart
							</p>
						</div>
						<div className="text-center">
							<div className="mx-auto bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
								2
							</div>
							<h3 className="text-xl font-semibold mb-2">Place Order</h3>
							<p className="text-gray-600">
								Complete checkout with secure payment options
							</p>
						</div>
						<div className="text-center">
							<div className="mx-auto bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
								3
							</div>
							<h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
							<p className="text-gray-600">
								Receive your medicines at your doorstep quickly
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-green-600 text-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div>
							<div className="flex justify-center mb-2">
								<Users className="h-8 w-8" />
							</div>
							<div className="text-4xl font-bold mb-2">10K+</div>
							<div className="text-green-100">Happy Customers</div>
						</div>
						<div>
							<div className="flex justify-center mb-2">
								<Package className="h-8 w-8" />
							</div>
							<div className="text-4xl font-bold mb-2">5K+</div>
							<div className="text-green-100">Medicines Available</div>
						</div>
						<div>
							<div className="flex justify-center mb-2">
								<CheckCircle2 className="h-8 w-8" />
							</div>
							<div className="text-4xl font-bold mb-2">25K+</div>
							<div className="text-green-100">Orders Delivered</div>
						</div>
						<div>
							<div className="flex justify-center mb-2">
								<Star className="h-8 w-8" />
							</div>
							<div className="text-4xl font-bold mb-2">4.8/5</div>
							<div className="text-green-100">Customer Rating</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<Card className="bg-gradient-to-r from-green-50 to-teal-50 border-none">
						<CardContent className="text-center py-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Ready to Start Shopping?
							</h2>
							<p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
								Join thousands of satisfied customers who trust us for their
								healthcare needs
							</p>
							<Link href="/shop" className="cursor-pointer">
								<Button size="lg" className="text-lg px-8 cursor-pointer">
									<ShoppingCart className="mr-2 h-5 w-5" />
									Explore Medicines
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
