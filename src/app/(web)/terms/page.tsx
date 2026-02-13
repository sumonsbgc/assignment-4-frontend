import { FileText } from "lucide-react";

export default function TermsPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero */}
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<FileText className="h-12 w-12 mx-auto mb-4 text-green-200" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Terms &amp; Conditions
						</h1>
						<p className="text-xl text-green-100">
							Please read these terms carefully before using our services
						</p>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className="py-16">
				<div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
					<h2>1. Acceptance of Terms</h2>
					<p>
						By accessing and using MediStore, you agree to be bound by these
						Terms &amp; Conditions. If you do not agree to all the terms, you
						may not access the service.
					</p>

					<h2>2. Eligibility</h2>
					<p>
						You must be at least 18 years old to use this platform. By placing
						an order, you represent that you are of legal age and have the legal
						capacity to enter into a binding agreement.
					</p>

					<h2>3. Account Responsibilities</h2>
					<p>
						You are responsible for maintaining the confidentiality of your
						account credentials. Any activity that occurs under your account is
						your responsibility. Please notify us immediately of any
						unauthorized use.
					</p>

					<h2>4. Orders &amp; Payments</h2>
					<p>
						All orders placed through MediStore are subject to acceptance and
						availability. We reserve the right to cancel any order due to
						pricing errors, stock unavailability, or suspected fraud. Payments
						are processed securely through our payment partners.
					</p>

					<h2>5. Prescription Medicines</h2>
					<p>
						Certain medicines require a valid prescription from a licensed
						medical practitioner. We reserve the right to reject orders for
						prescription medicines if a valid prescription is not provided.
					</p>

					<h2>6. Product Information</h2>
					<p>
						We strive to display accurate product information including
						descriptions, images, and pricing. However, we do not guarantee that
						product descriptions or other content is error-free.
					</p>

					<h2>7. Limitation of Liability</h2>
					<p>
						MediStore shall not be liable for any indirect, incidental, or
						consequential damages arising from the use of our services. Our
						total liability shall not exceed the amount paid for the specific
						order in question.
					</p>

					<h2>8. Modifications</h2>
					<p>
						We reserve the right to update these terms at any time. Continued
						use of the platform after changes constitutes acceptance of the
						revised terms.
					</p>

					<h2>9. Governing Law</h2>
					<p>
						These terms are governed by the laws of Bangladesh. Any disputes
						shall be resolved in the courts of Dhaka.
					</p>

					<p className="text-sm text-gray-500 mt-8">
						Last updated: February 14, 2026
					</p>
				</div>
			</section>
		</div>
	);
}
