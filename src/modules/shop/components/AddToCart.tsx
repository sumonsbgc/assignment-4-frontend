"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth-client";
import { addToCartAction } from "@/modules/shared/actions/cart.actions";
import { LoginRequiredModal, CustomerOnlyModal } from "@/modules/shared/modals";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { aark } from "aark-react-modalify";
import { Medicine } from "../types";

const AddToCart = ({ medicine }: { medicine: Medicine }) => {
	const [isPending, startTransition] = useTransition();
	const { data: session } = auth.useSession();
	const router = useRouter();

	const handleAddToCart = async () => {
		// Check if user is authenticated
		if (!session?.user) {
			aark.fire(
				<LoginRequiredModal
					onLogin={() => {
						aark.close();
						router.push("/login");
					}}
					onCancel={() => aark.close()}
				/>,
				{
					showCloseIcon: false,
					preventEscClose: false,
					preventOverlayClose: true,
				},
			);
			return;
		}

		// Check if user is a customer
		if (session.user.role !== "CUSTOMER") {
			aark.fire(<CustomerOnlyModal onClose={() => aark.close()} />, {
				showCloseIcon: false,
				preventEscClose: false,
				preventOverlayClose: true,
			});
			return;
		}

		startTransition(async () => {
			const result = await addToCartAction(medicine.id, 1);
			if (result.success) {
				aark.notification({
					title: "Added to Cart",
					text: "Item has been added to your cart",
					type: "success",
				});
			} else {
				aark.notification({
					title: "Add to Cart Failed",
					text: "Unable to add item to cart. Please try again.",
					type: "error",
				});
			}
		});
	};

	return (
		<Button
			onClick={handleAddToCart}
			className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
			disabled={medicine.stockQuantity === 0 || isPending}
		>
			<ShoppingCart className="h-4 w-4 mr-2" />
			{isPending
				? "Adding..."
				: medicine.stockQuantity === 0
					? "Out of Stock"
					: "Add to Cart"}
		</Button>
	);
};

export default AddToCart;
