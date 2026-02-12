import { getMedicineById } from "@/modules/medicine/services";
import { getCategories } from "@/modules/category/services";
import { EditForm } from "@/modules/medicine/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit Medicine - Seller | MediStore",
};

type EditMedicinePageProps = {
	params: Promise<{ id: string }>;
};

export default async function EditMedicinePage({
	params,
}: EditMedicinePageProps) {
	const { id } = await params;

	const [{ status, data: medicine }, { categories }] = await Promise.all([
		getMedicineById(id),
		getCategories({ isActive: true }),
	]);

	if (!status || !medicine) {
		notFound();
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/seller/medicines">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-3xl font-bold">Edit Medicine</h1>
					<p className="text-gray-600">Update medicine details and settings</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Medicine Information</CardTitle>
				</CardHeader>
				<CardContent>
					<EditForm
						medicine={medicine}
						categories={categories}
						redirectPath="/seller/medicines"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
