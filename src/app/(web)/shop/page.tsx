import { Suspense } from "react";
import Shop from "@/modules/shop/Shop";
import ShopSkeleton from "@/modules/shop/components/ShopSkeleton";
import BannerSection from "@/modules/shop/components/BannerSection";

export const metadata = {
	title: "Shop Medicines - MediStore",
	description:
		"Browse our wide selection of medicines, healthcare products, and wellness supplements. Find the best deals on prescription and over-the-counter medications.",
};

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
