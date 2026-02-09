import { OrderStatus, PaymentStatus } from "@/models/Order";

export const getStatusColor = (status: OrderStatus): string => {
	switch (status) {
		case OrderStatus.DELIVERED:
			return "bg-green-100 text-green-800";
		case OrderStatus.PROCESSING:
		case OrderStatus.CONFIRMED:
			return "bg-yellow-100 text-yellow-800";
		case OrderStatus.SHIPPED:
			return "bg-blue-100 text-blue-800";
		case OrderStatus.CANCELLED:
		case OrderStatus.RETURNED:
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export const getPaymentStatusColor = (status: PaymentStatus): string => {
	switch (status) {
		case PaymentStatus.PAID:
			return "bg-green-100 text-green-800";
		case PaymentStatus.UNPAID:
			return "bg-yellow-100 text-yellow-800";
		case PaymentStatus.FAILED:
		case PaymentStatus.REFUNDED:
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};
