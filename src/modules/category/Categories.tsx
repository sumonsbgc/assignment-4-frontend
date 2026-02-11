import { getCategories, prepareParams } from "./services";
import { getSession } from "@/lib/getSession";
import { Role } from "@/lib/roles";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	AddCategoryButton,
	CategoryModals,
	CategoryList,
	CategoryPagination,
	Filters,
} from "./components";

const Categories = async ({
	searchParams,
}: {
	searchParams: {
		page?: string;
		isActive?: string;
		parentId?: string;
		search?: string;
	};
}) => {
	const filterOptions = prepareParams(searchParams);

	const [{ user }, { categories, pagination }, allActiveCategories] =
		await Promise.all([
			getSession(),
			getCategories(filterOptions),
			getCategories({ isActive: true }),
		]);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Categories</h1>
					<p className="text-gray-600">Manage product categories</p>
				</div>
				<AddCategoryButton />
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>All Categories</CardTitle>
						<div className="text-sm text-gray-600">
							Total: {pagination?.total} categories
						</div>
					</div>
					<Filters
						basePath={
							user?.role === Role.ADMIN
								? "/admin/categories"
								: "/seller/categories"
						}
					/>
				</CardHeader>

				<CardContent>
					<CategoryList categories={categories} />
				</CardContent>

				<CardFooter className="flex justify-end">
					{pagination && (
						<CategoryPagination
							pagination={pagination}
							basePath={
								user?.role === Role.ADMIN
									? "/admin/categories"
									: "/seller/categories"
							}
						/>
					)}
				</CardFooter>
			</Card>

			{/* Modal Management Component */}
			<CategoryModals categories={allActiveCategories.categories} />
		</div>
	);
};

export default Categories;
