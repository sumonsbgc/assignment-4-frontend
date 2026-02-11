import Categories from "@/modules/category/Categories";
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
		<Suspense fallback={<div>Loading...</div>}>
			<Categories searchParams={params} />
		</Suspense>
	);
}
