"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useCheckout } from "../hooks/useCheckout";
import type { CartSummary } from "@/modules/shared/services/carts/getCarts";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Image from "next/image";

type CheckoutFormProps = {
	cartData: CartSummary;
};

export function CheckoutForm({ cartData }: CheckoutFormProps) {
	const { form } = useCheckout();

	const subtotal = cartData.subtotal;
	const shippingCost = subtotal > 500 ? 0 : 50;
	const tax = subtotal * 0.05;
	const total = subtotal + shippingCost + tax;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Checkout Form */}
				<div className="lg:col-span-2 space-y-6">
					{/* Shipping Information */}
					<Card>
						<CardHeader>
							<CardTitle>Shipping Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<form.Field name="shippingAddress">
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;

										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>
													Street Address <span className="text-red-500">*</span>
												</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="123 Main Street, Apartment 4B"
												/>
												{isInvalid && field.state.meta.errors && (
													<FieldError
														className="text-destructive"
														errors={field.state.meta.errors}
													/>
												)}
											</Field>
										);
									}}
								</form.Field>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<form.Field name="city">
										{(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;

											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>
														City <span className="text-red-500">*</span>
													</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Dhaka"
													/>
													{isInvalid && field.state.meta.errors && (
														<FieldError
															className="text-destructive"
															errors={field.state.meta.errors}
														/>
													)}
												</Field>
											);
										}}
									</form.Field>

									<form.Field name="state">
										{(field) => (
											<Field>
												<FieldLabel htmlFor={field.name}>
													State/Division (Optional)
												</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Dhaka Division"
												/>
											</Field>
										)}
									</form.Field>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<form.Field name="zipCode">
										{(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;

											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>
														ZIP/Postal Code{" "}
														<span className="text-red-500">*</span>
													</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="1000"
													/>
													{isInvalid && field.state.meta.errors && (
														<FieldError
															className="text-destructive"
															errors={field.state.meta.errors}
														/>
													)}
												</Field>
											);
										}}
									</form.Field>

									<form.Field name="country">
										{(field) => (
											<Field>
												<FieldLabel htmlFor={field.name}>Country</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													disabled
													className="bg-gray-50"
												/>
											</Field>
										)}
									</form.Field>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<form.Field name="phone">
									{(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;

										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>
													Phone Number <span className="text-red-500">*</span>
												</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													type="tel"
													placeholder="+880 1XXX-XXXXXX"
												/>
												{isInvalid && field.state.meta.errors && (
													<FieldError
														className="text-destructive"
														errors={field.state.meta.errors}
													/>
												)}
											</Field>
										);
									}}
								</form.Field>

								<form.Field name="notes">
									{(field) => (
										<Field>
											<FieldLabel htmlFor={field.name}>
												Delivery Notes (Optional)
											</FieldLabel>
											<Textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Any special instructions for delivery..."
												rows={3}
											/>
										</Field>
									)}
								</form.Field>
							</div>
						</CardContent>
					</Card>

					{/* Payment Method */}
					<Card>
						<CardHeader>
							<CardTitle>Payment Method</CardTitle>
						</CardHeader>
						<CardContent>
							<form.Field name="paymentMethod">
								{(field) => (
									<Field>
										<label htmlFor="payment-cod" className="cursor-pointer">
											<div
												className={`bg-blue-50 border-2 rounded-lg p-4 transition-colors ${
													field.state.value === "COD"
														? "border-blue-500"
														: "border-blue-200 hover:border-blue-300"
												}`}
											>
												<div className="flex items-start">
													<div className="flex items-center h-5">
														<input
															id="payment-cod"
															name={field.name}
															type="radio"
															value="COD"
															checked={field.state.value === "COD"}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
														/>
													</div>
													<div className="ml-3 flex items-start">
														<div className="shrink-0 mt-0.5">
															<svg
																className="h-5 w-5 text-blue-600"
																fill="currentColor"
																viewBox="0 0 20 20"
															>
																<path
																	fillRule="evenodd"
																	d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
																	clipRule="evenodd"
																/>
															</svg>
														</div>
														<div className="ml-3">
															<h3 className="text-sm font-medium text-blue-800">
																Cash on Delivery (COD)
															</h3>
															<div className="mt-2 text-sm text-blue-700">
																<p>
																	Pay with cash when your order is delivered to
																	your doorstep. Our delivery person will
																	collect the payment.
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</label>
									</Field>
								)}
							</form.Field>
						</CardContent>
					</Card>
				</div>

				{/* Order Summary */}
				<div className="lg:col-span-1">
					<Card className="sticky top-4">
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{/* Cart Items */}
								<div className="space-y-3">
									{cartData.items.map((item) => (
										<div key={item.id} className="flex gap-3">
											<div className="relative size-16 bg-gray-100 rounded shrink-0">
												{item.medicine.imageUrl && (
													<Image
														src={item.medicine.imageUrl}
														alt={item.medicine.name}
														fill
														className="object-cover rounded"
													/>
												)}
												<span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
													{item.quantity}
												</span>
											</div>
											<div className="flex-1 min-w-0">
												<h4 className="text-sm font-medium text-gray-900 truncate">
													{item.medicine.name}
												</h4>
												<p className="text-sm text-gray-500">
													{item.medicine.category?.name}
												</p>
												<p className="text-sm font-medium text-gray-900">
													৳
													{(
														(item.medicine.discountPrice ||
															item.medicine.price) * item.quantity
													).toFixed(2)}
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="border-t pt-4 space-y-2">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Subtotal</span>
										<span className="font-medium">৳{subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Shipping</span>
										<span className="font-medium">
											{shippingCost === 0 ? (
												<span className="text-green-600">Free</span>
											) : (
												`৳${shippingCost.toFixed(2)}`
											)}
										</span>
									</div>
									{subtotal < 500 && (
										<p className="text-xs text-gray-500">
											Free shipping on orders over ৳500
										</p>
									)}
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Tax (5%)</span>
										<span className="font-medium">৳{tax.toFixed(2)}</span>
									</div>
									<div className="border-t pt-2 flex justify-between">
										<span className="font-semibold">Total</span>
										<span className="font-bold text-lg">
											৳{total.toFixed(2)}
										</span>
									</div>
								</div>

								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
								>
									{([canSubmit, isSubmitting]) => (
										<Button
											type="submit"
											disabled={!canSubmit || isSubmitting}
											className="w-full"
										>
											{isSubmitting ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Processing...
												</>
											) : (
												<>Place Order - ৳{total.toFixed(2)}</>
											)}
										</Button>
									)}
								</form.Subscribe>

								<p className="text-xs text-gray-500 text-center">
									By placing your order, you agree to our terms and conditions
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</form>
	);
}
