import {
	ShoppingCart,
	Package,
	DollarSign,
	Star,
	Clock,
	CheckCircle,
	Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCustomerDashboard } from "./services";
import { StatsCard, RecentOrdersTable } from "./components";

const formatCurrency = (amount: number) =>
	`৳${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const CustomerDashboard = async () => {
	const data = await getCustomerDashboard();

	if (!data) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4">
				<p className="text-muted-foreground">
					Unable to load dashboard data. Please try again later.
				</p>
			</div>
		);
	}

	const { orders, spending, cart, reviews, recentOrders } = data;

	const spendingTrend =
		spending.lastMonth > 0
			? ((spending.thisMonth - spending.lastMonth) / spending.lastMonth) * 100
			: 0;

	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back! Here&apos;s an overview of your activity.
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatsCard
					title="Total Orders"
					value={orders.total}
					description={`${orders.delivered} delivered, ${orders.pending} pending`}
					icon={Package}
				/>
				<StatsCard
					title="Total Spent"
					value={formatCurrency(spending.totalSpent)}
					description={`Avg. ${formatCurrency(spending.averageOrderValue)} per order`}
					icon={DollarSign}
					trend={
						spending.lastMonth > 0
							? { value: spendingTrend, label: "from last month" }
							: undefined
					}
				/>
				<StatsCard
					title="Cart Items"
					value={cart.itemCount}
					description={
						cart.itemCount > 0
							? `Cart total: ${formatCurrency(cart.cartTotal)}`
							: "Your cart is empty"
					}
					icon={ShoppingCart}
				/>
				<StatsCard
					title="Reviews Given"
					value={reviews.total}
					description={
						reviews.total > 0
							? `Average rating: ${reviews.averageRating.toFixed(1)} ★`
							: "No reviews yet"
					}
					icon={Star}
				/>
			</div>

			{/* Order Status + Spending */}
			<div className="grid gap-4 md:grid-cols-2">
				{/* Order Status Breakdown */}
				<Card>
					<CardHeader>
						<CardTitle>Order Status</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<OrderStatusRow
								icon={Clock}
								label="Pending"
								count={orders.pending}
								color="text-yellow-600"
							/>
							<OrderStatusRow
								icon={CheckCircle}
								label="Confirmed"
								count={orders.confirmed}
								color="text-blue-600"
							/>
							<OrderStatusRow
								icon={Package}
								label="Processing"
								count={orders.processing}
								color="text-indigo-600"
							/>
							<OrderStatusRow
								icon={Truck}
								label="Shipped"
								count={orders.shipped}
								color="text-purple-600"
							/>
							<OrderStatusRow
								icon={CheckCircle}
								label="Delivered"
								count={orders.delivered}
								color="text-green-600"
							/>
						</div>
					</CardContent>
				</Card>

				{/* Monthly Spending */}
				<Card>
					<CardHeader>
						<CardTitle>Monthly Spending</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									This Month
								</span>
								<span className="text-lg font-semibold">
									{formatCurrency(spending.thisMonth)}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Last Month
								</span>
								<span className="text-lg font-semibold">
									{formatCurrency(spending.lastMonth)}
								</span>
							</div>
							<div className="border-t pt-4">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">All-time Total</span>
									<span className="text-lg font-bold">
										{formatCurrency(spending.totalSpent)}
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Orders */}
			<RecentOrdersTable orders={recentOrders} />
		</div>
	);
};

const OrderStatusRow = ({
	icon: Icon,
	label,
	count,
	color,
}: {
	icon: typeof Clock;
	label: string;
	count: number;
	color: string;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Icon className={`h-4 w-4 ${color}`} />
			<span className="text-sm">{label}</span>
		</div>
		<span className="text-sm font-semibold">{count}</span>
	</div>
);

export default CustomerDashboard;
