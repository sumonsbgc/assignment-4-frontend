"use client";

import { Category, MedicineFilters } from "../types";
import { useFilter } from "../hooks/useFilter";

const FilterSection = ({
	filters,
	categories,
}: {
	filters: MedicineFilters;
	categories: Category[];
}) => {
	const { updateFilters, clearFilters } = useFilter();

	return (
		<aside className="lg:col-span-1">
			<div className="bg-white rounded-lg border p-6 sticky top-4">
				<h2 className="text-xl font-semibold mb-4">Filters</h2>

				{/* Search */}
				<div className="mb-6">
					<label className="block text-sm font-medium mb-2">Search</label>
					<input
						type="text"
						placeholder="Search medicines..."
						defaultValue={filters.search || ""}
						onChange={(e) => updateFilters({ search: e.target.value })}
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				{/* Category */}
				<div className="mb-6">
					<label className="block text-sm font-medium mb-2">Category</label>
					<select
						defaultValue={filters.categoryId || ""}
						onChange={(e) => updateFilters({ categoryId: e.target.value })}
						className="w-full px-3 py-2 border rounded-md"
					>
						<option value="">All Categories</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				{/* Price Range */}
				<div className="mb-6">
					<label className="block text-sm font-medium mb-2">Price Range</label>
					<div className="flex gap-2">
						<input
							type="number"
							placeholder="Min"
							defaultValue={filters.minPrice || ""}
							onChange={(e) =>
								updateFilters({
									minPrice: e.target.value
										? parseFloat(e.target.value)
										: undefined,
								})
							}
							className="w-full px-3 py-2 border rounded-md"
						/>
						<input
							type="number"
							placeholder="Max"
							defaultValue={filters.maxPrice || ""}
							onChange={(e) =>
								updateFilters({
									maxPrice: e.target.value
										? parseFloat(e.target.value)
										: undefined,
								})
							}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
				</div>

				{/* Sort By */}
				<div className="mb-6">
					<label className="block text-sm font-medium mb-2">Sort By</label>
					<select
						defaultValue={filters.sortBy || ""}
						onChange={(e) => updateFilters({ sortBy: e.target.value })}
						className="w-full px-3 py-2 border rounded-md"
					>
						<option value="">Default</option>
						<option value="price">Price: Low to High</option>
						<option value="name">Name: A to Z</option>
					</select>
				</div>

				{/* Clear Button */}
				<button
					onClick={clearFilters}
					className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
				>
					Clear All Filters
				</button>
			</div>
		</aside>
	);
};

export default FilterSection;
