"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/modules/contact/services/submitContact";

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [result, setResult] = useState<{
		success: boolean;
		message: string;
	} | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsSubmitting(true);
		setResult(null);

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			phone: (formData.get("phone") as string) || undefined,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
		};

		if (!data.name || !data.email || !data.subject || !data.message) {
			setResult({
				success: false,
				message: "Please fill in all required fields.",
			});
			setIsSubmitting(false);
			return;
		}

		const res = await submitContact(data);
		setResult(res);
		setIsSubmitting(false);

		if (res.success) {
			(e.target as HTMLFormElement).reset();
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Send us a Message</CardTitle>
				<CardDescription>
					Fill out the form below and we&apos;ll get back to you as soon as
					possible.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{result && (
					<div
						className={`mb-4 flex items-center gap-2 rounded-lg p-3 text-sm ${
							result.success
								? "bg-green-50 text-green-700 border border-green-200"
								: "bg-red-50 text-red-700 border border-red-200"
						}`}
					>
						{result.success ? (
							<CheckCircle2 className="h-4 w-4 shrink-0" />
						) : (
							<AlertCircle className="h-4 w-4 shrink-0" />
						)}
						{result.message}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">
							Name <span className="text-red-500">*</span>
						</Label>
						<Input
							id="name"
							name="name"
							placeholder="Your name"
							required
							disabled={isSubmitting}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">
							Email <span className="text-red-500">*</span>
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="your@email.com"
							required
							disabled={isSubmitting}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone</Label>
						<Input
							id="phone"
							name="phone"
							type="tel"
							placeholder="+880 1XXX-XXXXXX"
							disabled={isSubmitting}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="subject">
							Subject <span className="text-red-500">*</span>
						</Label>
						<Input
							id="subject"
							name="subject"
							placeholder="How can we help?"
							required
							disabled={isSubmitting}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="message">
							Message <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="message"
							name="message"
							placeholder="Your message..."
							rows={5}
							required
							disabled={isSubmitting}
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Sending...
							</>
						) : (
							"Send Message"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
