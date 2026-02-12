import Categories from "@/modules/category/Categories";
import { CategoriesSkeleton } from "@/modules/category/components";
import { Suspense } from "react";

type AdminCategoriesPageProps = {
	searchParams: Promise<{
		page?: string;
		status?: string;
	}>;
};

export default async function AdminCategoriesPage({
	searchParams,
}: AdminCategoriesPageProps) {
	const params = await searchParams;

	return (
		<Suspense fallback={<CategoriesSkeleton />}>
			<Categories searchParams={params} />
		</Suspense>
	);
}
