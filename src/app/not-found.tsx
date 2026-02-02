import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-teal-50">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto text-center">
					{/* 404 Large Text */}
					<div className="mb-8">
						<h1 className="text-9xl md:text-[12rem] font-bold text-green-600 opacity-20">
							404
						</h1>
						<div className="-mt-20">
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
								Page Not Found
							</h2>
							<p className="text-lg md:text-xl text-gray-600 mb-8">
								Oops! The page you&apos;re looking for doesn&apos;t exist or has
								been moved.
							</p>
						</div>
					</div>

					{/* Illustration or Icon */}
					<div className="mb-8">
						<div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-green-100 mb-6">
							<Search className="h-16 w-16 text-green-600" />
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/" className="cursor-pointer">
							<Button
								size="lg"
								className="text-lg px-8 cursor-pointer bg-green-600 hover:bg-green-700"
							>
								<Home className="mr-2 h-5 w-5" />
								Go to Homepage
							</Button>
						</Link>
						<Link href="/shop" className="cursor-pointer">
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-8 cursor-pointer border-green-600 text-green-600 hover:bg-green-50"
							>
								<Search className="mr-2 h-5 w-5" />
								Browse Medicines
							</Button>
						</Link>
					</div>

					{/* Additional Help */}
					<div className="mt-12">
						<p className="text-gray-600">
							Need help?{" "}
							<Link
								href="/contact"
								className="text-green-600 hover:text-green-700 underline cursor-pointer"
							>
								Contact our support team
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
