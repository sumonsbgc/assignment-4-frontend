"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-50">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto text-center">
					<div className="mb-8">
						<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
							<AlertTriangle className="h-12 w-12 text-red-600" />
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Something went wrong!
						</h2>
						<p className="text-lg text-gray-600 mb-2">
							We encountered an unexpected error. Please try again.
						</p>
						{error.message && (
							<p className="text-sm text-gray-500">{error.message}</p>
						)}
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							onClick={reset}
							size="lg"
							className="text-lg px-8 cursor-pointer bg-red-600 hover:bg-red-700"
						>
							<RotateCcw className="mr-2 h-5 w-5" />
							Try Again
						</Button>
						<Link href="/" className="cursor-pointer">
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-8 cursor-pointer"
							>
								<Home className="mr-2 h-5 w-5" />
								Go Home
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
