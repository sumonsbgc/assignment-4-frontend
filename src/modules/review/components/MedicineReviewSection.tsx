import { getReviewStats } from "../services/getReviewStats";
import { getMedicineReviews } from "../services/getMedicineReviews";
import { getSession } from "@/lib/getSession";
import { RatingDistribution } from "./RatingDistribution";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";
import { Role } from "@/lib/roles";

interface MedicineReviewSectionProps {
	medicineId: string;
}

export async function MedicineReviewSection({
	medicineId,
}: MedicineReviewSectionProps) {
	const [{ stats }, { reviews }, { user, isAuthenticated }] = await Promise.all(
		[
			getReviewStats(medicineId),
			getMedicineReviews(medicineId, 1, 20),
			getSession(),
		],
	);

	const isCustomer = isAuthenticated && user?.role === Role.CUSTOMER;

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Customer Reviews</h2>
			{stats && <RatingDistribution stats={stats} />}
			{isCustomer && <ReviewForm medicineId={medicineId} />}
			<ReviewList reviews={reviews} currentUserId={user?.id} />
		</div>
	);
}
