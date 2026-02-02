import { Suspense } from "react";
import Shop from "@/modules/shop/Shop";
import ShopSkeleton from "@/modules/shop/components/ShopSkeleton";
import BannerSection from "@/modules/shop/components/BannerSection";

export default async function ShopPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | undefined>>;
}) {
	const params = await searchParams;

	return (
		<div className="flex flex-col min-h-screen">
			<BannerSection />

			<Suspense fallback={<ShopSkeleton />}>
				<Shop searchParams={params} />
			</Suspense>
		</div>
	);
}
