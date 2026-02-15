import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export type LoginRequiredModalProps = {
	onLogin: () => void;
	onCancel: () => void;
};

export const LoginRequiredModal = ({
	onLogin,
	onCancel,
}: LoginRequiredModalProps) => {
	return (
		<div className="p-6 w-full max-w-lg mx-auto text-center">
			<div className="flex justify-center mb-4">
				<LogIn className="h-12 w-12 text-blue-500" />
			</div>
			<h2 className="text-2xl font-semibold mb-2">Login Required</h2>
			<p className="text-gray-600 mb-6 text-base">
				You need to be logged in to add items to your cart. Please login to
				continue shopping.
			</p>
			<div className="flex gap-3 justify-center">
				<Button
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						onCancel();
					}}
					className="pointer-events-auto cursor-pointer"
				>
					Cancel
				</Button>
				<Button
					onClick={(e) => {
						e.stopPropagation();
						onLogin();
					}}
					className="pointer-events-auto cursor-pointer"
				>
					<LogIn className="h-4 w-4 mr-2" />
					Go to Login
				</Button>
			</div>
		</div>
	);
};
