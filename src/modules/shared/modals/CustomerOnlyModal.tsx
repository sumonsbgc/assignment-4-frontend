import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export type CustomerOnlyModalProps = {
	onClose: () => void;
};

export const CustomerOnlyModal = ({ onClose }: CustomerOnlyModalProps) => {
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
			<div className="flex gap-3 justify-center">
				<Button
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						onClose();
					}}
					className="pointer-events-auto cursor-pointer"
				>
					Close
				</Button>
			</div>
		</div>
	);
};
