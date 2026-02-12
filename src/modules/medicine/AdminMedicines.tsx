import { getMedicines, prepareParams } from "./services";
import { getCategories } from "@/modules/category/services";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { AdminMedicineList } from "./components/AdminMedicineList";
import { MedicinePagination, Filters } from "./components";

const AdminMedicines = async ({
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

	// Admin sees ALL medicines — no sellerId filter
	const [{ medicines, pagination }, { categories }] = await Promise.all([
		getMedicines(filterOptions),
		getCategories({ isActive: true }),
	]);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">All Medicines</h1>
					<p className="text-gray-600">
						Overview of all medicines across sellers
					</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Medicines</CardTitle>
						<div className="text-sm text-gray-600">
							Total: {pagination?.total ?? 0} medicines
						</div>
					</div>
					<Filters basePath="/admin/medicines" categories={categories} />
				</CardHeader>

				<CardContent>
					<AdminMedicineList medicines={medicines} />
				</CardContent>

				<CardFooter className="flex justify-end">
					{pagination && (
						<MedicinePagination
							pagination={pagination}
							basePath="/admin/medicines"
						/>
					)}
				</CardFooter>
			</Card>
		</div>
	);
};

export default AdminMedicines;
