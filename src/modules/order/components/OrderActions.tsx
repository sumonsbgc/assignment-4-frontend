"use client";

import { useState } from "react";
import { IOrder } from "@/models/Order";
import { Button } from "@/components/ui/button";
import { Package, CreditCard } from "lucide-react";
import { Role } from "@/lib/roles";
import { UpdateStatusDialog } from "./UpdateStatusDialog";
import { UpdatePaymentDialog } from "./UpdatePaymentDialog";

type OrderActionsProps = {
	order: IOrder;
	role: Role.ADMIN | Role.SELLER; // Only admin and seller can access order management
};

export function OrderActions({ order, role }: OrderActionsProps) {
	const [statusDialogOpen, setStatusDialogOpen] = useState(false);
	const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

	const canUpdatePayment = role === Role.ADMIN;

	return (
		<div className="flex gap-2">
			<Button onClick={() => setStatusDialogOpen(true)} size="sm">
				<Package className="w-4 h-4 mr-2" />
				Update Status
			</Button>

			{canUpdatePayment && (
				<Button
					onClick={() => setPaymentDialogOpen(true)}
					variant="outline"
					size="sm"
				>
					<CreditCard className="w-4 h-4 mr-2" />
					Update Payment
				</Button>
			)}

			<UpdateStatusDialog
				orderId={order.id}
				currentStatus={order.status}
				open={statusDialogOpen}
				onOpenChange={setStatusDialogOpen}
			/>

			{canUpdatePayment && (
				<UpdatePaymentDialog
					orderId={order.id}
					currentPaymentStatus={order.paymentStatus}
					open={paymentDialogOpen}
					onOpenChange={setPaymentDialogOpen}
				/>
			)}
		</div>
	);
}
