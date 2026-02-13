import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
	PENDING: "bg-yellow-100 text-yellow-800",
	CONFIRMED: "bg-blue-100 text-blue-800",
	PROCESSING: "bg-indigo-100 text-indigo-800",
	SHIPPED: "bg-purple-100 text-purple-800",
	DELIVERED: "bg-green-100 text-green-800",
	CANCELLED: "bg-red-100 text-red-800",
	RETURNED: "bg-orange-100 text-orange-800",
	PAID: "bg-green-100 text-green-800",
	UNPAID: "bg-red-100 text-red-800",
	FAILED: "bg-red-100 text-red-800",
	REFUNDED: "bg-orange-100 text-orange-800",
};

interface StatusBadgeProps {
	status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
		>
			{status}
		</span>
	);
};
