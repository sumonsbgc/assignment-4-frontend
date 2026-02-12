"use client";

import type { ICategory } from "@/models/Models";
import type { Medicine } from "../types";
import { useUpdateMedicine } from "../hooks";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type EditFormProps = {
	medicine: Medicine;
	categories: ICategory[];
	onSuccess?: () => void;
};

export const EditForm = ({
	medicine,
	categories,
	onSuccess,
}: EditFormProps) => {
	const { form } = useUpdateMedicine({ medicine, onSuccess });

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<div className="space-y-4 py-4">
				{/* Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<form.Field name="name">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										Medicine Name <span className="text-red-500">*</span>
									</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="e.g., Paracetamol 500mg"
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

					<form.Field name="genericName">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Generic Name</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g., Acetaminophen"
								/>
							</Field>
						)}
					</form.Field>
				</div>

				<form.Field name="description">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Description</FieldLabel>
							<Textarea
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Describe the medicine, its uses, and benefits..."
								rows={3}
							/>
						</Field>
					)}
				</form.Field>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<form.Field name="manufacturer">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										Manufacturer <span className="text-red-500">*</span>
									</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="e.g., Pfizer"
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

					<form.Field name="categoryId">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										Category <span className="text-red-500">*</span>
									</FieldLabel>
									<Select
										value={field.state.value}
										onValueChange={(value) => field.handleChange(value)}
									>
										<SelectTrigger id={field.name}>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
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
				</div>

				{/* Pricing */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<form.Field name="price">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>
										Price ($) <span className="text-red-500">*</span>
									</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										type="number"
										step="0.01"
										min="0"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(parseFloat(e.target.value) || 0)
										}
										placeholder="0.00"
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

					<form.Field name="discountPrice">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Discount Price ($)</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="number"
									step="0.01"
									min="0"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) =>
										field.handleChange(parseFloat(e.target.value) || 0)
									}
									placeholder="0.00"
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="unit">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Unit</FieldLabel>
								<Select
									value={field.state.value}
									onValueChange={(value) => field.handleChange(value)}
								>
									<SelectTrigger id={field.name}>
										<SelectValue placeholder="Select unit" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pcs">Pieces</SelectItem>
										<SelectItem value="box">Box</SelectItem>
										<SelectItem value="strip">Strip</SelectItem>
										<SelectItem value="bottle">Bottle</SelectItem>
										<SelectItem value="tube">Tube</SelectItem>
										<SelectItem value="pack">Pack</SelectItem>
									</SelectContent>
								</Select>
							</Field>
						)}
					</form.Field>
				</div>

				{/* Stock */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<form.Field name="stockQuantity">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Stock Quantity</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										type="number"
										min="0"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(parseInt(e.target.value) || 0)
										}
										placeholder="0"
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

					<form.Field name="lowStockThreshold">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>
									Low Stock Threshold
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="number"
									min="0"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) =>
										field.handleChange(parseInt(e.target.value) || 0)
									}
									placeholder="10"
								/>
							</Field>
						)}
					</form.Field>
				</div>

				{/* Medicine Details */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<form.Field name="dosageForm">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Dosage Form</FieldLabel>
								<Select
									value={field.state.value}
									onValueChange={(value) => field.handleChange(value)}
								>
									<SelectTrigger id={field.name}>
										<SelectValue placeholder="Select form" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="tablet">Tablet</SelectItem>
										<SelectItem value="capsule">Capsule</SelectItem>
										<SelectItem value="syrup">Syrup</SelectItem>
										<SelectItem value="injection">Injection</SelectItem>
										<SelectItem value="cream">Cream</SelectItem>
										<SelectItem value="ointment">Ointment</SelectItem>
										<SelectItem value="drops">Drops</SelectItem>
										<SelectItem value="inhaler">Inhaler</SelectItem>
										<SelectItem value="powder">Powder</SelectItem>
									</SelectContent>
								</Select>
							</Field>
						)}
					</form.Field>

					<form.Field name="strength">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Strength</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g., 500mg"
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="packSize">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Pack Size</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g., 10 tablets"
								/>
							</Field>
						)}
					</form.Field>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<form.Field name="expiryDate">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Expiry Date</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="date"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="imageUrl">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="https://example.com/image.jpg"
									type="url"
								/>
							</Field>
						)}
					</form.Field>
				</div>

				<form.Field name="ingredients">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Active Ingredients</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="e.g., Paracetamol 500mg, Caffeine 65mg"
							/>
						</Field>
					)}
				</form.Field>

				<form.Field name="sideEffects">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Side Effects</FieldLabel>
							<Textarea
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="List potential side effects..."
								rows={2}
							/>
						</Field>
					)}
				</form.Field>

				<form.Field name="warnings">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>
								Warnings & Precautions
							</FieldLabel>
							<Textarea
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="e.g., Do not exceed recommended dose..."
								rows={2}
							/>
						</Field>
					)}
				</form.Field>

				<form.Field name="storage">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Storage Instructions</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="e.g., Store below 25°C in a dry place"
							/>
						</Field>
					)}
				</form.Field>

				{/* Toggles */}
				<div className="flex flex-col gap-4">
					<form.Field name="requiresPrescription">
						{(field) => (
							<Field orientation="horizontal">
								<FieldLabel htmlFor={field.name}>
									Requires Prescription
								</FieldLabel>
								<Switch
									id={field.name}
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(checked)}
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="isActive">
						{(field) => (
							<Field orientation="horizontal">
								<FieldLabel htmlFor={field.name}>Active</FieldLabel>
								<Switch
									id={field.name}
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(checked)}
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="isFeatured">
						{(field) => (
							<Field orientation="horizontal">
								<FieldLabel htmlFor={field.name}>Featured</FieldLabel>
								<Switch
									id={field.name}
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(checked)}
								/>
							</Field>
						)}
					</form.Field>
				</div>
			</div>

			<div className="flex justify-end gap-2 pt-4">
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button type="submit" disabled={!canSubmit || isSubmitting}>
							{isSubmitting && (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							)}
							Update Medicine
						</Button>
					)}
				</form.Subscribe>
			</div>
		</form>
	);
};
