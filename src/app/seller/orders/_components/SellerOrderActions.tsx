"use client";

import { useState } from "react";
import { IOrder } from "@/models/Order";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { UpdateStatusDialog } from "@/modules/order/components/admin";

type SellerOrderActionsProps = {
	order: IOrder;
};

export function SellerOrderActions({ order }: SellerOrderActionsProps) {
	const [statusDialogOpen, setStatusDialogOpen] = useState(false);

	return (
		<div className="flex gap-2">
			<Button onClick={() => setStatusDialogOpen(true)} size="sm">
				<Package className="w-4 h-4 mr-2" />
				Update Status
			</Button>

			<UpdateStatusDialog
				orderId={order.id}
				currentStatus={order.status}
				open={statusDialogOpen}
				onOpenChange={setStatusDialogOpen}
			/>
		</div>
	);
}
