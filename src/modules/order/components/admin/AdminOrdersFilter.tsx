"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/models/Order";

export function AdminOrdersFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentStatus = searchParams.get("status") || "ALL";

	const handleStatusChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value === "ALL") {
			params.delete("status");
		} else {
			params.set("status", value);
		}
		params.set("page", "1");
		router.push(`/admin/orders?${params.toString()}`);
	};

	return (
		<Select value={currentStatus} onValueChange={handleStatusChange}>
			<SelectTrigger className="w-full md:w-45">
				<SelectValue placeholder="Filter by status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="ALL">All Orders</SelectItem>
				<SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
				<SelectItem value={OrderStatus.CONFIRMED}>Confirmed</SelectItem>
				<SelectItem value={OrderStatus.PROCESSING}>Processing</SelectItem>
				<SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
				<SelectItem value={OrderStatus.DELIVERED}>Delivered</SelectItem>
				<SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
				<SelectItem value={OrderStatus.RETURNED}>Returned</SelectItem>
			</SelectContent>
		</Select>
	);
}
