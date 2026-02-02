import { getMedicine } from "./services/getMedicine";
import Medicine from "./sections/Medicine";

interface MedicineDetailProps {
	medicineId: string;
}

const MedicineDetail = async ({ medicineId }: MedicineDetailProps) => {
	const { data: medicine } = await getMedicine({ medicineId });
	return <Medicine medicine={medicine} />;
};

export default MedicineDetail;
