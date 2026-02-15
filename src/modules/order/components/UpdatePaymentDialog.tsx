"use client";

import { useState } from "react";
import { PaymentStatus } from "@/models/Order";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
	updatePaymentStatus,
	type UpdatePaymentStatusData,
} from "@/modules/order/services";
import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";

type UpdatePaymentDialogProps = {
	orderId: string;
	currentPaymentStatus: PaymentStatus;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function UpdatePaymentDialog({
	orderId,
	currentPaymentStatus,
	open,
	onOpenChange,
}: UpdatePaymentDialogProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [paymentStatus, setPaymentStatus] =
		useState<PaymentStatus>(currentPaymentStatus);

	const handleSubmit = async () => {
		setIsLoading(true);

		const data: UpdatePaymentStatusData = {
			paymentStatus,
		};

		const result = await updatePaymentStatus(orderId, data);

		setIsLoading(false);

		if (result.success) {
			aark.notification({
				title: "Payment Updated",
				text: "Payment status has been updated successfully",
				type: "success",
			});
			onOpenChange(false);
			router.refresh();
		} else {
			aark.notification({
				title: "Update Failed",
				text: result.message?.includes("HTTP") 
					? "Unable to update payment status. Please try again."
					: result.message || "Unable to update payment status. Please try again.",
				type: "error",
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Payment Status</DialogTitle>
					<DialogDescription>
						Change the payment status of this order.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="paymentStatus">Payment Status</Label>
						<Select
							value={paymentStatus}
							onValueChange={(value) =>
								setPaymentStatus(value as PaymentStatus)
							}
						>
							<SelectTrigger id="paymentStatus">
								<SelectValue placeholder="Select payment status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={PaymentStatus.UNPAID}>Unpaid</SelectItem>
								<SelectItem value={PaymentStatus.PAID}>Paid</SelectItem>
								<SelectItem value={PaymentStatus.FAILED}>Failed</SelectItem>
								<SelectItem value={PaymentStatus.REFUNDED}>Refunded</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Update Payment
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
