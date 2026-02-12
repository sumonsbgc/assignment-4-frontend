import AdminMedicines from "@/modules/medicine/AdminMedicines";
import { AdminMedicinesSkeleton } from "@/modules/medicine/components";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "All Medicines - Admin | MediStore",
	description: "Overview of all medicines across sellers",
};

type AdminMedicinesPageProps = {
	searchParams: Promise<{
		page?: string;
		search?: string;
		categoryId?: string;
		isActive?: string;
		sortBy?: string;
		sortOrder?: string;
	}>;
};

export default async function AdminMedicinesPage({
	searchParams,
}: AdminMedicinesPageProps) {
	const params = await searchParams;

	return (
		<Suspense fallback={<AdminMedicinesSkeleton />}>
			<AdminMedicines searchParams={params} />
		</Suspense>
	);
}
