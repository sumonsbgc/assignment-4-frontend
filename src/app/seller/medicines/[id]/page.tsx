import { getMedicineById } from "@/modules/medicine/services";
import { MedicineDetail } from "@/modules/medicine/components/MedicineDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Medicine Details - Seller | MediStore",
};

type SellerMedicineDetailPageProps = {
	params: Promise<{ id: string }>;
};

export default async function SellerMedicineDetailPage({
	params,
}: SellerMedicineDetailPageProps) {
	const { id } = await params;
	const { status, data: medicine } = await getMedicineById(id);

	if (!status || !medicine) {
		notFound();
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" asChild>
						<Link href="/seller/medicines">
							<ArrowLeft className="w-4 h-4" />
						</Link>
					</Button>
					<div>
						<h1 className="text-3xl font-bold">Medicine Details</h1>
						<p className="text-gray-600">View medicine information</p>
					</div>
				</div>
				<Button asChild>
					<Link href={`/seller/medicines/${id}/edit`}>
						<Edit className="w-4 h-4 mr-2" />
						Edit Medicine
					</Link>
				</Button>
			</div>

			<MedicineDetail medicine={medicine} />
		</div>
	);
}
