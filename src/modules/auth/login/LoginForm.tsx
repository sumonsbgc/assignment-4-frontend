"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { useLogin } from "../hooks/useLogin";
import { Loader2, Eye, EyeOff } from "lucide-react";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { form, onGoogleLogin, isError, message, isGoogleLoading } = useLogin();

	const passwordRef = useRef<HTMLInputElement>(null);

	const toggleVisibility = (ref: React.RefObject<HTMLInputElement | null>) => {
		if (!ref.current) return;
		const input = ref.current;
		const btn = input.nextElementSibling as HTMLButtonElement;
		const isPassword = input.type === "password";
		input.type = isPassword ? "text" : "password";
		btn.dataset.visible = isPassword ? "true" : "false";
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
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

							<form.Field name="password">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<div className="flex items-center">
												<FieldLabel htmlFor="password">Password</FieldLabel>
												<a
													href="#"
													className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
												>
													Forgot your password?
												</a>
											</div>
											<div className="relative">
												<Input
													ref={passwordRef}
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													type="password"
													placeholder="Your password"
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
											{isSubmitting ? "Logging in..." : "Login"}
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
								<FieldDescription className="text-center">
									Don&apos;t have an account?{" "}
									<Link href="/register">Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
