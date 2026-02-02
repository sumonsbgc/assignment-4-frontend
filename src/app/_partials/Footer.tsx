import Link from "next/link";
import {
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
} from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* About Section */}
					<div>
						<h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
						<p className="text-sm leading-relaxed">
							Your trusted online pharmacy providing quality medicines and
							healthcare products with fast, reliable delivery service.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-white text-lg font-semibold mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/shop"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									Shop Medicines
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="/faq"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									FAQs
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h3 className="text-white text-lg font-semibold mb-4">
							Customer Service
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/terms"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/shipping"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									Shipping Policy
								</Link>
							</li>
							<li>
								<Link
									href="/returns"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									Return Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-white text-lg font-semibold mb-4">
							Contact Us
						</h3>
						<ul className="space-y-3">
							<li className="flex items-start gap-2">
								<MapPin className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
								<span className="text-sm">
									123 Pharmacy Street, Medical City, MC 12345
								</span>
							</li>
							<li className="flex items-center gap-2">
								<Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
								<a
									href="tel:+1234567890"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									+1 (234) 567-890
								</a>
							</li>
							<li className="flex items-center gap-2">
								<Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
								<a
									href="mailto:info@pharmacy.com"
									className="text-sm hover:text-green-400 transition-colors cursor-pointer"
								>
									info@pharmacy.com
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Social Media & Copyright */}
				<div className="border-t border-gray-800 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm">
							© {new Date().getFullYear()} Online Pharmacy. All rights reserved.
						</p>
						<div className="flex gap-4">
							<Link
								href="#"
								className="hover:text-green-400 transition-colors cursor-pointer"
								aria-label="Facebook"
							>
								<Facebook className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="hover:text-green-400 transition-colors cursor-pointer"
								aria-label="Twitter"
							>
								<Twitter className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="hover:text-green-400 transition-colors cursor-pointer"
								aria-label="Instagram"
							>
								<Instagram className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="hover:text-green-400 transition-colors cursor-pointer"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-5 w-5" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
