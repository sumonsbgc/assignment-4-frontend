"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { cancelOrder } from "../services/cancelOrder";
import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";
import { ConfirmModal } from "@/modules/shared/modals";

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
			<ConfirmModal
				title="Cancel Order"
				description="Are you sure you want to cancel this order? This action cannot be undone."
				confirmText="Yes, Cancel Order"
				cancelText="Keep Order"
				variant="warning"
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
								text: result.message?.includes("HTTP") 
									? "Unable to cancel order. Please try again."
									: result.message || "Unable to cancel order. Please try again.",
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
