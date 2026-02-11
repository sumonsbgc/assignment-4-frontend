"use client";

import { ICategory } from "@/models/Models";
import { useCreateCategory } from "../hooks";
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

type CreateFormProps = {
	categories: ICategory[];
	onSuccess?: () => void;
};

export const CreateForm = ({ categories, onSuccess }: CreateFormProps) => {
	const { form } = useCreateCategory({ onSuccess });

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<div className="space-y-4 py-4">
				<form.Field name="name">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>
									Category Name <span className="text-red-500">*</span>
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g., Pain Relief"
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
								placeholder="Brief description of the category..."
								rows={3}
							/>
						</Field>
					)}
				</form.Field>

				<form.Field name="image">
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

				<form.Field name="parentId">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>
								Parent Category (Optional)
							</FieldLabel>
							<Select
								value={field.state.value}
								onValueChange={(value) => field.handleChange(value)}
								disabled={false}
							>
								<SelectTrigger id={field.name}>
									<SelectValue placeholder="None - Top Level Category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category: ICategory) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<p className="text-xs text-muted-foreground mt-1">
								Select a parent to create a sub-category
							</p>
						</Field>
					)}
				</form.Field>

				<form.Field name="order">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Display Order</FieldLabel>
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
								<p className="text-xs text-muted-foreground mt-1">
									Lower numbers appear first
								</p>
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

			<div className="flex justify-end gap-2 pt-4">
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button type="submit" disabled={!canSubmit || isSubmitting}>
							{isSubmitting && (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							)}
							Create Category
						</Button>
					)}
				</form.Subscribe>
			</div>
		</form>
	);
};
