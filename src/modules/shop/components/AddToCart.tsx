"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth-client";
import { addToCartAction } from "@/modules/shared/actions/cart.actions";
import { LogIn, ShoppingCart, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { aark } from "aark-react-modalify";
import { Medicine } from "../types";

type LoginRequiredModalProps = {
	onLogin: () => void;
	onCancel: () => void;
};

const LoginRequiredModal = ({ onLogin, onCancel }: LoginRequiredModalProps) => {
	return (
		<div className="p-6 w-full max-w-lg mx-auto text-center">
			<h2 className="text-2xl font-semibold mb-2">Login Required</h2>
			<p className="text-gray-600 mb-6 text-base">
				You need to be logged in to add items to your cart. Please login to
				continue shopping.
			</p>
			<div className="flex gap-3 justify-center relative z-101">
				<Button
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						onCancel();
					}}
					className="relative z-102 pointer-events-auto"
				>
					Cancel
				</Button>
				<Button
					onClick={(e) => {
						e.stopPropagation();
						onLogin();
					}}
					className="relative z-102 pointer-events-auto"
				>
					<LogIn className="h-4 w-4 mr-2" />
					Go to Login
				</Button>
			</div>
		</div>
	);
};

type CustomerOnlyModalProps = {
	onClose: () => void;
};

const CustomerOnlyModal = ({ onClose }: CustomerOnlyModalProps) => {
	return (
		<div className="p-6 w-full max-w-lg mx-auto text-center">
			<div className="flex justify-center mb-4">
				<ShieldAlert className="h-12 w-12 text-orange-500" />
			</div>
			<h2 className="text-2xl font-semibold mb-2">Access Restricted</h2>
			<p className="text-gray-600 mb-6 text-base">
				Only customers can add items to the cart. Please login with a customer
				account to continue shopping.
			</p>
			<div className="flex gap-3 justify-center relative z-101">
				<Button
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						onClose();
					}}
					className="relative z-102 pointer-events-auto"
				>
					Close
				</Button>
			</div>
		</div>
	);
};

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
					title: "Success",
					text: result.message || "Added to cart successfully!",
					type: "success",
				});
			} else {
				aark.notification({
					title: "Error",
					text: result.message || "Failed to add to cart",
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
