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
import { User, Mail, Phone, MapPin, Lock, CreditCard } from "lucide-react";

export default function ProfilePage() {
	// Mock user data - replace with actual data from API
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		address: {
			street: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
		},
	};

	const initials = user.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">My Profile</h1>

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
								<h2 className="text-xl font-semibold mb-1">{user.name}</h2>
								<p className="text-sm text-gray-600 mb-4">{user.email}</p>
								<Button variant="outline" size="sm" className="w-full">
									Change Avatar
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Profile Content */}
				<div className="lg:col-span-3">
					<Tabs defaultValue="personal" className="space-y-6">
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="personal">Personal Info</TabsTrigger>
							<TabsTrigger value="address">Address</TabsTrigger>
							<TabsTrigger value="security">Security</TabsTrigger>
							<TabsTrigger value="payment">Payment</TabsTrigger>
						</TabsList>

						{/* Personal Information Tab */}
						<TabsContent value="personal">
							<Card>
								<CardHeader>
									<CardTitle>Personal Information</CardTitle>
									<CardDescription>
										Update your personal details here
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="firstName">First Name</Label>
												<Input id="firstName" defaultValue="John" />
											</div>
											<div className="space-y-2">
												<Label htmlFor="lastName">Last Name</Label>
												<Input id="lastName" defaultValue="Doe" />
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<div className="relative">
												<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="email"
													type="email"
													className="pl-10"
													defaultValue={user.email}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="phone">Phone Number</Label>
											<div className="relative">
												<Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="phone"
													type="tel"
													className="pl-10"
													defaultValue={user.phone}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="bio">Bio</Label>
											<Textarea
												id="bio"
												placeholder="Tell us about yourself..."
												rows={4}
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

						{/* Address Tab */}
						<TabsContent value="address">
							<Card>
								<CardHeader>
									<CardTitle>Shipping Address</CardTitle>
									<CardDescription>
										Manage your shipping addresses
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="street">Street Address</Label>
											<div className="relative">
												<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="street"
													className="pl-10"
													defaultValue={user.address.street}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="space-y-2">
												<Label htmlFor="city">City</Label>
												<Input id="city" defaultValue={user.address.city} />
											</div>
											<div className="space-y-2">
												<Label htmlFor="state">State</Label>
												<Input id="state" defaultValue={user.address.state} />
											</div>
											<div className="space-y-2">
												<Label htmlFor="zip">ZIP Code</Label>
												<Input id="zip" defaultValue={user.address.zip} />
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="country">Country</Label>
											<Input id="country" defaultValue="United States" />
										</div>
										<div className="flex gap-2">
											<Button type="submit">Save Address</Button>
											<Button type="button" variant="outline">
												Add New Address
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Security Tab */}
						<TabsContent value="security">
							<Card>
								<CardHeader>
									<CardTitle>Security Settings</CardTitle>
									<CardDescription>
										Update your password and security preferences
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="currentPassword">Current Password</Label>
											<div className="relative">
												<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="currentPassword"
													type="password"
													className="pl-10"
													placeholder="Enter current password"
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="newPassword">New Password</Label>
											<div className="relative">
												<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="newPassword"
													type="password"
													className="pl-10"
													placeholder="Enter new password"
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="confirmPassword">
												Confirm New Password
											</Label>
											<div className="relative">
												<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="confirmPassword"
													type="password"
													className="pl-10"
													placeholder="Confirm new password"
												/>
											</div>
										</div>
										<div className="flex gap-2">
											<Button type="submit">Update Password</Button>
											<Button type="button" variant="outline">
												Cancel
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Payment Tab */}
						<TabsContent value="payment">
							<Card>
								<CardHeader>
									<CardTitle>Payment Methods</CardTitle>
									<CardDescription>
										Manage your saved payment methods
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<p className="text-sm text-gray-600">
											No saved payment methods yet. Add your payment information
											during checkout.
										</p>
										<Button variant="outline">
											<CreditCard className="mr-2 h-4 w-4" />
											Add Payment Method
										</Button>
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
