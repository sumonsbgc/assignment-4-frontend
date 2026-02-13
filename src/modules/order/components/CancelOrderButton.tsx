"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { cancelOrder } from "../services/cancelOrder";
import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";

type CancelOrderButtonProps = {
	orderId: string;
	status: string;
};

export function CancelOrderButton({ orderId, status }: CancelOrderButtonProps) {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	if (!["PENDING", "CONFIRMED"].includes(status)) {
		return null;
	}

	const handleCancel = () => {
		aark.fire(
			<CancelConfirmModal
				onConfirm={async () => {
					setIsPending(true);
					try {
						const result = await cancelOrder(orderId);
						if (result.success) {
							aark.notification({
								title: "Order Cancelled",
								text: "Your order has been cancelled successfully.",
								type: "success",
							});
							aark.close();
							router.refresh();
						} else {
							aark.notification({
								title: "Cancel Failed",
								text: result.message,
								type: "error",
							});
						}
					} catch {
						aark.notification({
							title: "Error",
							text: "Failed to cancel order. Please try again.",
							type: "error",
						});
					} finally {
						setIsPending(false);
					}
				}}
				onCancel={() => aark.close()}
			/>,
			{
				showCloseIcon: false,
				preventEscClose: false,
				preventOverlayClose: true,
			},
		);
	};

	return (
		<Button
			variant="destructive"
			size="sm"
			onClick={handleCancel}
			disabled={isPending}
			className="cursor-pointer"
		>
			<XCircle className="w-4 h-4 mr-1" />
			{isPending ? "Cancelling..." : "Cancel Order"}
		</Button>
	);
}

function CancelConfirmModal({
	onConfirm,
	onCancel,
}: {
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<div className="bg-white rounded-lg p-6 max-w-md relative z-100 shadow-lg">
			<h2 className="text-xl font-semibold mb-2">Cancel Order</h2>
			<p className="text-gray-600 mb-6">
				Are you sure you want to cancel this order? This action cannot be
				undone.
			</p>
			<div className="flex gap-3 justify-end relative z-101">
				<Button
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						onCancel();
					}}
					className="relative z-102 pointer-events-auto cursor-pointer"
				>
					Keep Order
				</Button>
				<Button
					variant="destructive"
					onClick={(e) => {
						e.stopPropagation();
						onConfirm();
					}}
					className="relative z-102 pointer-events-auto cursor-pointer"
				>
					Yes, Cancel Order
				</Button>
			</div>
		</div>
	);
}
