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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Mail, Phone, User as UserIcon } from "lucide-react";
import type { User } from "../types";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { ImageUpload } from "@/components/ui/image-upload";

type ProfileEditFormProps = {
	user: User;
	title?: string;
	description?: string;
	onSuccess?: () => void;
};

export const ProfileEditForm = ({
	user,
	title = "Personal Information",
	description = "Update your personal details",
	onSuccess,
}: ProfileEditFormProps) => {
	const { form, message, isError } = useUpdateProfile({ user, onSuccess });
	console.log("Profile Edit Form", user);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					{/* Profile Image */}
					<form.Field name="image">
						{(field) => (
							<Field>
								<FieldLabel>Profile Photo</FieldLabel>
								<ImageUpload
									value={field.state.value}
									onChange={(url) => field.handleChange(url)}
									folder="users"
									label="Upload photo"
									rounded
								/>
							</Field>
						)}
					</form.Field>

					{/* Name */}
					<form.Field name="name">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
									<div className="relative">
										<UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id={field.name}
											className="pl-10"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder="Enter full name"
										/>
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

					{/* Email */}
					<form.Field name="email">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Email</FieldLabel>
									<div className="relative">
										<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id={field.name}
											type="email"
											className="pl-10"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder="Enter email address"
										/>
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

					{/* Phone */}
					<form.Field name="phone">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
									<div className="relative">
										<Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id={field.name}
											type="tel"
											className="pl-10"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder="Enter phone number"
										/>
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

					{/* Message */}
					{message && (
						<p
							className={`text-sm ${isError ? "text-red-500" : "text-green-600"}`}
						>
							{message}
						</p>
					)}

					{/* Actions */}
					<div className="flex gap-2">
						<form.Subscribe selector={(state) => state.isSubmitting}>
							{(isSubmitting) => (
								<Button type="submit" disabled={isSubmitting}>
									{isSubmitting ? "Saving..." : "Save Changes"}
								</Button>
							)}
						</form.Subscribe>
						<Button
							type="button"
							variant="outline"
							onClick={() => form.reset()}
						>
							Cancel
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
