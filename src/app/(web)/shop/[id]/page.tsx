import { Suspense } from "react";
import MedicineDetail from "@/modules/shop/MedicineDetail";
import MedicineDetailSkeleton from "@/modules/shop/components/MedicineDetailSkeleton";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	return (
		<Suspense fallback={<MedicineDetailSkeleton />}>
			<MedicineDetail medicineId={id} />
		</Suspense>
	);
};

export default Page;
