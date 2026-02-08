"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Store, FileText } from "lucide-react";

export default function SellerProfilePage() {
	// Mock seller data - replace with actual data from API
	const seller = {
		name: "MediCare Pharmacy",
		ownerName: "John Seller",
		email: "seller@example.com",
		phone: "+1 (555) 987-6543",
		businessNumber: "BN-123456789",
		taxId: "TAX-987654321",
		description: "Premium quality medicines and healthcare products",
		address: {
			street: "456 Business Avenue",
			city: "New York",
			state: "NY",
			zip: "10002",
		},
	};

	const initials = seller.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div>
				<h1 className="text-3xl font-bold">Seller Profile</h1>
				<p className="text-gray-600">Manage your seller account information</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				{/* Profile Sidebar */}
				<div>
					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center text-center">
								<Avatar className="w-24 h-24 mb-4">
									<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
										{initials}
									</AvatarFallback>
								</Avatar>
								<h2 className="text-xl font-semibold mb-1">{seller.name}</h2>
								<p className="text-sm text-gray-600 mb-1">{seller.ownerName}</p>
								<p className="text-sm text-gray-600 mb-4">{seller.email}</p>
								<Button variant="outline" size="sm" className="w-full">
									Upload Logo
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Profile Content */}
				<div className="lg:col-span-3">
					<Tabs defaultValue="business" className="space-y-6">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="business">Business Info</TabsTrigger>
							<TabsTrigger value="contact">Contact Details</TabsTrigger>
							<TabsTrigger value="documents">Documents</TabsTrigger>
						</TabsList>

						{/* Business Information Tab */}
						<TabsContent value="business">
							<Card>
								<CardHeader>
									<CardTitle>Business Information</CardTitle>
									<CardDescription>
										Update your business details and description
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="businessName">Business Name</Label>
											<div className="relative">
												<Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="businessName"
													className="pl-10"
													defaultValue={seller.name}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="ownerName">Owner Name</Label>
											<div className="relative">
												<User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="ownerName"
													className="pl-10"
													defaultValue={seller.ownerName}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="businessNumber">
													Business Registration Number
												</Label>
												<Input
													id="businessNumber"
													defaultValue={seller.businessNumber}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="taxId">Tax ID</Label>
												<Input id="taxId" defaultValue={seller.taxId} />
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="description">Business Description</Label>
											<Textarea
												id="description"
												placeholder="Describe your business..."
												rows={4}
												defaultValue={seller.description}
											/>
										</div>
										<div className="flex gap-2">
											<Button type="submit">Save Changes</Button>
											<Button type="button" variant="outline">
												Cancel
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Contact Details Tab */}
						<TabsContent value="contact">
							<Card>
								<CardHeader>
									<CardTitle>Contact Information</CardTitle>
									<CardDescription>
										Update your contact details and business address
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="email">Business Email</Label>
											<div className="relative">
												<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="email"
													type="email"
													className="pl-10"
													defaultValue={seller.email}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="phone">Business Phone</Label>
											<div className="relative">
												<Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="phone"
													type="tel"
													className="pl-10"
													defaultValue={seller.phone}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="street">Street Address</Label>
											<div className="relative">
												<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="street"
													className="pl-10"
													defaultValue={seller.address.street}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="space-y-2">
												<Label htmlFor="city">City</Label>
												<Input id="city" defaultValue={seller.address.city} />
											</div>
											<div className="space-y-2">
												<Label htmlFor="state">State</Label>
												<Input id="state" defaultValue={seller.address.state} />
											</div>
											<div className="space-y-2">
												<Label htmlFor="zip">ZIP Code</Label>
												<Input id="zip" defaultValue={seller.address.zip} />
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="website">Website (Optional)</Label>
											<Input
												id="website"
												type="url"
												placeholder="https://yourwebsite.com"
											/>
										</div>
										<div className="flex gap-2">
											<Button type="submit">Save Changes</Button>
											<Button type="button" variant="outline">
												Cancel
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Documents Tab */}
						<TabsContent value="documents">
							<Card>
								<CardHeader>
									<CardTitle>Business Documents</CardTitle>
									<CardDescription>
										Upload and manage your business verification documents
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-6">
										<div className="border-2 border-dashed rounded-lg p-8 text-center">
											<FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
											<h3 className="text-lg font-semibold mb-2">
												Upload Documents
											</h3>
											<p className="text-sm text-gray-600 mb-4">
												Upload business license, tax documents, or
												certifications
											</p>
											<Button variant="outline">Choose Files</Button>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold">Uploaded Documents</h3>
											<div className="space-y-2">
												<div className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center gap-3">
														<FileText className="w-5 h-5 text-gray-500" />
														<div>
															<p className="font-medium">Business License</p>
															<p className="text-sm text-gray-600">
																Uploaded on Jan 15, 2026
															</p>
														</div>
													</div>
													<Button variant="ghost" size="sm">
														View
													</Button>
												</div>
												<div className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center gap-3">
														<FileText className="w-5 h-5 text-gray-500" />
														<div>
															<p className="font-medium">Tax Registration</p>
															<p className="text-sm text-gray-600">
																Uploaded on Jan 15, 2026
															</p>
														</div>
													</div>
													<Button variant="ghost" size="sm">
														View
													</Button>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
