import { getCategories } from "@/modules/category/services";
import { CreateForm } from "@/modules/medicine/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Add New Medicine - Seller | MediStore",
};

export default async function NewMedicinePage() {
	const { categories } = await getCategories({ isActive: true });

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/seller/medicines">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-3xl font-bold">Add New Medicine</h1>
					<p className="text-gray-600">
						Fill in the details to add a new medicine to your inventory
					</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Medicine Information</CardTitle>
				</CardHeader>
				<CardContent>
					<CreateForm
						categories={categories}
						redirectPath="/seller/medicines"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
