import { getMedicines, prepareParams } from "./services";
import { getCategories } from "@/modules/category/services";
import { getSession } from "@/lib/getSession";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	AddMedicineButton,
	MedicineModals,
	MedicineList,
	MedicinePagination,
	Filters,
} from "./components";

const Medicines = async ({
	searchParams,
}: {
	searchParams: {
		page?: string;
		search?: string;
		categoryId?: string;
		isActive?: string;
		sortBy?: string;
		sortOrder?: string;
	};
}) => {
	const filterOptions = prepareParams(searchParams);

	const { user } = await getSession();

	// Seller sees only their own medicines
	if (user?.id) {
		filterOptions.sellerId = user.id;
	}

	const [{ medicines, pagination }, { categories }] = await Promise.all([
		getMedicines(filterOptions),
		getCategories({ isActive: true }),
	]);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Medicines</h1>
					<p className="text-gray-600">Manage your medicine inventory</p>
				</div>
				<AddMedicineButton />
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>All Medicines</CardTitle>
						<div className="text-sm text-gray-600">
							Total: {pagination?.total ?? 0} medicines
						</div>
					</div>
					<Filters basePath="/seller/medicines" categories={categories} />
				</CardHeader>

				<CardContent>
					<MedicineList medicines={medicines} />
				</CardContent>

				<CardFooter className="flex justify-end">
					{pagination && (
						<MedicinePagination
							pagination={pagination}
							basePath="/seller/medicines"
						/>
					)}
				</CardFooter>
			</Card>

			{/* Modal Management Component */}
			<MedicineModals categories={categories} />
		</div>
	);
};

export default Medicines;
