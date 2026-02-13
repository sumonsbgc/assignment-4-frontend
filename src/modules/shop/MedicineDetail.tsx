import { getMedicine } from "./services/getMedicine";
import Medicine from "./sections/Medicine";
import { MedicineReviewSection } from "@/modules/review";

interface MedicineDetailProps {
	medicineId: string;
}

const MedicineDetail = async ({ medicineId }: MedicineDetailProps) => {
	const { data: medicine } = await getMedicine({ medicineId });
	return (
		<>
			<Medicine medicine={medicine} />
			<div className="container mx-auto px-4 pb-12">
				<MedicineReviewSection medicineId={medicineId} />
			</div>
		</>
	);
};

export default MedicineDetail;
