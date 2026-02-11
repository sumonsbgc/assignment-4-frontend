import { getCarts } from "@/modules/shared/services/carts/getCarts";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { CartEmpty, CartItem, CartSummary } from "@/modules/cart";

export const metadata = {
	title: "Shopping Cart - MediStore",
	description: "View and manage your shopping cart",
};

export const dynamic = "force-dynamic";

export default async function CartPage() {
	const { isAuthenticated } = await getSession();

	if (!isAuthenticated) {
		redirect("/login?redirect=/cart");
	}

	const { data: carts } = await getCarts();
	const cartItems = carts?.items || [];
	const subtotal = carts?.subtotal || 0;

	const shippingCost = subtotal > 500 ? 0 : subtotal > 0 ? 50 : 0;
	const tax = subtotal * 0.05;
	const total = subtotal + shippingCost + tax;

	return (
		<div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
			<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

			{cartItems.length === 0 ? (
				<CartEmpty />
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-4">
						{cartItems.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>

					<div>
						<CartSummary
							subtotal={subtotal}
							totalQuantity={carts?.totalQuantity || 0}
							shippingCost={shippingCost}
							tax={tax}
							total={total}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
