import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { getCarts } from "@/modules/shared/services/carts/getCarts";
import { CheckoutForm } from "@/modules/order/components/CheckoutForm";

export const metadata = {
	title: "Checkout - MediStore",
	description: "Complete your order",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
	const { isAuthenticated } = await getSession();

	if (!isAuthenticated) {
		redirect("/login?redirect=/checkout");
	}

	const { data: cartData } = await getCarts();

	// If cart is empty, redirect to cart page
	if (!cartData || !cartData.items || cartData.items.length === 0) {
		redirect("/cart");
	}

	return (
		<div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
			<h1 className="text-3xl font-bold mb-8">Checkout</h1>
			<CheckoutForm cartData={cartData} />
		</div>
	);
}
