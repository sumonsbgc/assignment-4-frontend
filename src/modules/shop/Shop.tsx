import FilterSection from "./sections/FilterSection";
import MedicineCard from "./components/MedicineCard";
import ShopPagination from "./components/ShopPagination";
import { getCategories, getMedicines } from "./services";
import { modifiedFilters } from "./services/modifiedFilters";
import type { MedicineFilters } from "./types";

export default async function Shop({
	searchParams,
}: {
	searchParams: Record<string, string | undefined>;
}) {
	const filters: MedicineFilters = modifiedFilters(searchParams);

	const [{ data: categories }, { data: medicines, pagination }] =
		await Promise.all([getCategories(), getMedicines(filters)]);

	return (
		<section className="py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					<FilterSection filters={filters} categories={categories} />

					<div className="lg:col-span-3">
						<div className="mb-4">
							<p className="text-sm text-gray-600">
								Showing {medicines.length} of {pagination.total} medicines
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{medicines.map((medicine) => (
								<MedicineCard medicine={medicine} key={medicine.id} />
							))}
						</div>

						<ShopPagination pagination={pagination} />
					</div>
				</div>
			</div>
		</section>
	);
}
