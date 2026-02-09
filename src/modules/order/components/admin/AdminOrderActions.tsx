"use client";

import { useState } from "react";
import { IOrder } from "@/models/Order";
import { Button } from "@/components/ui/button";
import { Package, CreditCard } from "lucide-react";
import {
	UpdateStatusDialog,
	UpdatePaymentDialog,
} from "@/modules/order/components/admin";

type AdminOrderActionsProps = {
	order: IOrder;
};

export function AdminOrderActions({ order }: AdminOrderActionsProps) {
	const [statusDialogOpen, setStatusDialogOpen] = useState(false);
	const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

	return (
		<div className="flex gap-2">
			<Button onClick={() => setStatusDialogOpen(true)} size="sm">
				<Package className="w-4 h-4 mr-2" />
				Update Status
			</Button>
			<Button
				onClick={() => setPaymentDialogOpen(true)}
				variant="outline"
				size="sm"
			>
				<CreditCard className="w-4 h-4 mr-2" />
				Update Payment
			</Button>

			<UpdateStatusDialog
				orderId={order.id}
				currentStatus={order.status}
				open={statusDialogOpen}
				onOpenChange={setStatusDialogOpen}
			/>

			<UpdatePaymentDialog
				orderId={order.id}
				currentPaymentStatus={order.paymentStatus}
				open={paymentDialogOpen}
				onOpenChange={setPaymentDialogOpen}
			/>
		</div>
	);
}
