import { Shield } from "lucide-react";

export default function PrivacyPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero */}
			<section className="relative bg-linear-to-r from-green-600 to-teal-700 text-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<Shield className="h-12 w-12 mx-auto mb-4 text-green-200" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Privacy Policy
						</h1>
						<p className="text-xl text-green-100">
							How we collect, use, and protect your personal information
						</p>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className="py-16">
				<div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
					<h2>1. Information We Collect</h2>
					<p>
						We collect information you provide directly, including your name,
						email address, phone number, shipping address, and payment details
						when you create an account or place an order.
					</p>

					<h2>2. How We Use Your Information</h2>
					<ul>
						<li>Process and fulfill your orders</li>
						<li>Communicate order updates and delivery status</li>
						<li>Improve our products and services</li>
						<li>Send promotional offers (with your consent)</li>
						<li>Prevent fraud and ensure platform security</li>
					</ul>

					<h2>3. Data Sharing</h2>
					<p>
						We do not sell your personal information to third parties. We may
						share data with trusted delivery partners and payment processors
						solely for the purpose of fulfilling your orders.
					</p>

					<h2>4. Data Security</h2>
					<p>
						We implement industry-standard security measures including
						encryption, secure servers, and access controls to protect your
						personal data. However, no method of electronic transmission is 100%
						secure.
					</p>

					<h2>5. Cookies</h2>
					<p>
						We use cookies and similar technologies to enhance your browsing
						experience, remember your preferences, and analyze site traffic. You
						can manage cookie preferences through your browser settings.
					</p>

					<h2>6. Your Rights</h2>
					<p>
						You have the right to access, update, or delete your personal
						information at any time. You can manage your profile from your
						account dashboard or contact our support team for assistance.
					</p>

					<h2>7. Data Retention</h2>
					<p>
						We retain your personal data for as long as your account is active
						or as needed to provide services. Order history may be retained for
						legal and accounting purposes.
					</p>

					<h2>8. Changes to This Policy</h2>
					<p>
						We may update this privacy policy periodically. Any significant
						changes will be communicated via email or a notice on our platform.
					</p>

					<p className="text-sm text-gray-500 mt-8">
						Last updated: February 14, 2026
					</p>
				</div>
			</section>
		</div>
	);
}
