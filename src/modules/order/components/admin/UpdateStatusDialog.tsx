"use client";

import { useState } from "react";
import { OrderStatus } from "@/models/Order";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
	updateOrderStatus,
	type UpdateOrderStatusData,
} from "@/modules/order/services/admin";

import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";

type UpdateStatusDialogProps = {
	orderId: string;
	currentStatus: OrderStatus;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function UpdateStatusDialog({
	orderId,
	currentStatus,
	open,
	onOpenChange,
}: UpdateStatusDialogProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<OrderStatus>(currentStatus);
	const [trackingNumber, setTrackingNumber] = useState("");

	const handleSubmit = async () => {
		setIsLoading(true);

		const data: UpdateOrderStatusData = {
			status,
		};

		if (trackingNumber) {
			data.trackingNumber = trackingNumber;
		}

		const result = await updateOrderStatus(orderId, data);

		setIsLoading(false);

		if (result.success) {
			aark.notification({
				title: "Success",
				text: result.message,
				type: "success",
			});
			onOpenChange(false);
			router.refresh();
		} else {
			aark.notification({
				title: "Error",
				text: result.message,
				type: "error",
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Order Status</DialogTitle>
					<DialogDescription>
						Change the status of this order and optionally add a tracking
						number.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="status">Order Status</Label>
						<Select
							value={status}
							onValueChange={(value) => setStatus(value as OrderStatus)}
						>
							<SelectTrigger id="status">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
								<SelectItem value={OrderStatus.CONFIRMED}>Confirmed</SelectItem>
								<SelectItem value={OrderStatus.PROCESSING}>
									Processing
								</SelectItem>
								<SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
								<SelectItem value={OrderStatus.DELIVERED}>Delivered</SelectItem>
								<SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
								<SelectItem value={OrderStatus.RETURNED}>Returned</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{(status === OrderStatus.SHIPPED ||
						status === OrderStatus.DELIVERED) && (
						<div className="space-y-2">
							<Label htmlFor="tracking">Tracking Number (Optional)</Label>
							<Input
								id="tracking"
								placeholder="Enter tracking number"
								value={trackingNumber}
								onChange={(e) => setTrackingNumber(e.target.value)}
							/>
						</div>
					)}
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
						Update Status
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
