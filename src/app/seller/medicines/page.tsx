import Medicines from "@/modules/medicine/Medicines";
import { MedicinesSkeleton } from "@/modules/medicine/components";
import { Suspense } from "react";

type SellerMedicinesPageProps = {
	searchParams: Promise<{
		page?: string;
		search?: string;
		categoryId?: string;
		isActive?: string;
		sortBy?: string;
		sortOrder?: string;
	}>;
};

export default async function SellerMedicinesPage({
	searchParams,
}: SellerMedicinesPageProps) {
	const params = await searchParams;

	return (
		<Suspense fallback={<MedicinesSkeleton />}>
			<Medicines searchParams={params} />
		</Suspense>
	);
}
