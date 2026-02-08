"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRegister } from "../hooks/useRegister";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Role, RoleLabels } from "@/lib/roles";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
	const { form, onGoogleLogin, isError, message, isGoogleLoading } =
		useRegister();

	// Use refs to avoid re-renders on visibility toggle
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const toggleVisibility = (ref: React.RefObject<HTMLInputElement | null>) => {
		if (!ref.current) return;
		const input = ref.current;
		const btn = input.nextElementSibling as HTMLButtonElement;
		const isPassword = input.type === "password";
		input.type = isPassword ? "text" : "password";
		btn.dataset.visible = isPassword ? "true" : "false";
	};

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>

			{isError && message && (
				<div className="flex justify-center bg-red-50 p-4">
					<h3 className="text-sm font-medium text-red-800">{message}</h3>
				</div>
			)}

			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field name="name">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											type="text"
											placeholder="John Doe"
										/>
										{isInvalid && field.state.meta.errors && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="email">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											type="email"
											placeholder="m@example.com"
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

						<form.Field name="role">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Role</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(value) =>
												field.handleChange(value as Role.CUSTOMER | Role.SELLER)
											}
										>
											<SelectTrigger id={field.name}>
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Role</SelectLabel>
													<SelectItem value={Role.CUSTOMER}>
														{RoleLabels[Role.CUSTOMER]}
													</SelectItem>
													<SelectItem value={Role.SELLER}>
														{RoleLabels[Role.SELLER]}
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
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

						<form.Field name="password">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Password</FieldLabel>
										<div className="relative">
											<Input
												ref={passwordRef}
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												type="password"
												className="pr-10"
											/>
											<button
												type="button"
												onClick={() => toggleVisibility(passwordRef)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground [&[data-visible=true]>svg:first-child]:hidden [&:not([data-visible=true])>svg:last-child]:hidden"
												tabIndex={-1}
												data-visible="false"
											>
												<Eye className="h-4 w-4" />
												<EyeOff className="h-4 w-4" />
											</button>
										</div>
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

						<form.Field name="confirmPassword">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Confirm Password
										</FieldLabel>
										<div className="relative">
											<Input
												ref={confirmPasswordRef}
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												type="password"
												className="pr-10"
											/>
											<button
												type="button"
												onClick={() => toggleVisibility(confirmPasswordRef)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground [&[data-visible=true]>svg:first-child]:hidden [&:not([data-visible=true])>svg:last-child]:hidden"
												tabIndex={-1}
												data-visible="false"
											>
												<Eye className="h-4 w-4" />
												<EyeOff className="h-4 w-4" />
											</button>
										</div>
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
						<FieldGroup>
							<Field>
								<form.Subscribe
									selector={(state) => ({
										isSubmitting: state.isSubmitting,
										isValid: state.isValid,
									})}
								>
									{({ isSubmitting, isValid }) => (
										<Button type="submit" disabled={isSubmitting || !isValid}>
											{isSubmitting && (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											)}
											{isSubmitting ? "Creating..." : "Create Account"}
										</Button>
									)}
								</form.Subscribe>
								<Button
									variant="outline"
									type="button"
									onClick={onGoogleLogin}
									disabled={isGoogleLoading}
								>
									{isGoogleLoading && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Continue with Google
								</Button>
								<FieldDescription className="px-6 text-center">
									Already have an account? <Link href="/login">Sign in</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
