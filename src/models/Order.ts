import { IUser } from "./Models";

export enum OrderStatus {
	PENDING = "PENDING",
	CONFIRMED = "CONFIRMED",
	PROCESSING = "PROCESSING",
	SHIPPED = "SHIPPED",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED",
	RETURNED = "RETURNED",
}

export enum PaymentStatus {
	UNPAID = "UNPAID",
	PAID = "PAID",
	FAILED = "FAILED",
	REFUNDED = "REFUNDED",
}

export interface IOrderItem {
	id: string;
	orderId: string;
	medicineId: string;
	quantity: number;
	price: number;
	discount: number;
	subtotal: number;
	medicine: {
		id: string;
		name: string;
		imageUrl: string | null;
		category: {
			id: string;
			name: string;
		};
	};
}

export interface IOrder {
	id: string;
	orderNumber: string;
	userId: string;
	status: OrderStatus;
	subtotal: number;
	shippingCost: number;
	tax: number;
	totalAmount: number;
	shippingAddress: string;
	city: string;
	state: string | null;
	zipCode: string;
	country: string | null;
	phone: string;
	paymentMethod: string;
	paymentStatus: PaymentStatus;
	trackingNumber: string | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
	orderItems: IOrderItem[];
	user: IUser;
}

export interface IOrdersResponse {
	data: IOrder[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasMore: boolean;
	};
}
