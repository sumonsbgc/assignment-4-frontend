import {
	Users,
	Package,
	DollarSign,
	ShoppingCart,
	Star,
	Layers,
	AlertTriangle,
	UserPlus,
	Clock,
	CheckCircle,
	Truck,
	XCircle,
	RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminDashboard } from "./services";
import { StatsCard, RecentOrdersTable } from "./components";

const formatCurrency = (amount: number) =>
	`৳${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const AdminDashboard = async () => {
	const data = await getAdminDashboard();

	if (!data) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4">
				<p className="text-muted-foreground">
					Unable to load dashboard data. Please try again later.
				</p>
			</div>
		);
	}

	const {
		users,
		medicines,
		orders,
		revenue,
		categories,
		reviews,
		recentOrders,
	} = data;

	const revenueTrend =
		revenue.lastMonth > 0
			? ((revenue.thisMonth - revenue.lastMonth) / revenue.lastMonth) * 100
			: 0;

	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<p className="text-muted-foreground">
					Platform overview and key metrics.
				</p>
			</div>

			{/* Top-Level Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatsCard
					title="Total Users"
					value={users.total}
					description={`${users.customers} customers, ${users.sellers} sellers`}
					icon={Users}
				/>
				<StatsCard
					title="Total Revenue"
					value={formatCurrency(revenue.totalRevenue)}
					description={`This month: ${formatCurrency(revenue.thisMonth)}`}
					icon={DollarSign}
					trend={
						revenue.lastMonth > 0
							? { value: revenueTrend, label: "from last month" }
							: undefined
					}
				/>
				<StatsCard
					title="Total Orders"
					value={orders.total}
					description={`${orders.delivered} delivered, ${orders.pending} pending`}
					icon={ShoppingCart}
				/>
				<StatsCard
					title="Total Medicines"
					value={medicines.total}
					description={`${medicines.active} active, ${medicines.outOfStock} out of stock`}
					icon={Package}
				/>
			</div>

			{/* Detailed Breakdown */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* User Breakdown */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-4 w-4" />
							Users
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<StatRow label="Customers" value={users.customers} />
							<StatRow label="Sellers" value={users.sellers} />
							<StatRow label="Admins" value={users.admins} />
							<div className="border-t pt-3">
								<StatRow
									label="Active"
									value={users.activeUsers}
									color="text-green-600"
								/>
								<StatRow
									label="Banned"
									value={users.bannedUsers}
									color="text-red-600"
								/>
							</div>
							<div className="border-t pt-3 flex items-center justify-between">
								<div className="flex items-center gap-1">
									<UserPlus className="h-3.5 w-3.5 text-blue-500" />
									<span className="text-sm text-blue-600">New this month</span>
								</div>
								<span className="text-sm font-semibold text-blue-600">
									{users.newThisMonth}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Order Breakdown */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ShoppingCart className="h-4 w-4" />
							Order Status
						</CardTitle>
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
							<OrderStatusRow
								icon={XCircle}
								label="Cancelled"
								count={orders.cancelled}
								color="text-red-600"
							/>
							<OrderStatusRow
								icon={RotateCcw}
								label="Returned"
								count={orders.returned}
								color="text-orange-600"
							/>
						</div>
					</CardContent>
				</Card>

				{/* Revenue & Payment */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<DollarSign className="h-4 w-4" />
							Revenue & Payments
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									This Month
								</span>
								<span className="text-lg font-semibold">
									{formatCurrency(revenue.thisMonth)}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Last Month
								</span>
								<span className="text-lg font-semibold">
									{formatCurrency(revenue.lastMonth)}
								</span>
							</div>
							<div className="border-t pt-3 space-y-3">
								<StatRow
									label="Total Paid"
									value={formatCurrency(revenue.totalPaid)}
									color="text-green-600"
								/>
								<StatRow
									label="Total Unpaid"
									value={formatCurrency(revenue.totalUnpaid)}
									color="text-red-600"
								/>
							</div>
							<div className="border-t pt-3">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">All-time Revenue</span>
									<span className="text-lg font-bold">
										{formatCurrency(revenue.totalRevenue)}
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Medicine + Category + Reviews */}
			<div className="grid gap-4 md:grid-cols-3">
				{/* Medicine Stats */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="h-4 w-4" />
							Medicines
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<StatRow label="Active" value={medicines.active} />
							<StatRow label="Inactive" value={medicines.inactive} />
							<StatRow label="Featured" value={medicines.featured} />
							<div className="border-t pt-3">
								<StatRow
									label="Out of Stock"
									value={medicines.outOfStock}
									color="text-red-600"
									icon={<AlertTriangle className="h-3.5 w-3.5 text-red-500" />}
								/>
								<StatRow
									label="Low Stock"
									value={medicines.lowStock}
									color="text-yellow-600"
									icon={
										<AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
									}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Category Stats */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Layers className="h-4 w-4" />
							Categories
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<StatRow label="Total" value={categories.total} />
							<StatRow label="Active" value={categories.active} />
							<StatRow
								label="Inactive"
								value={categories.total - categories.active}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Review Stats */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Star className="h-4 w-4" />
							Reviews
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<StatRow label="Total Reviews" value={reviews.total} />
							<StatRow
								label="Average Rating"
								value={
									reviews.total > 0
										? `${reviews.averageRating.toFixed(1)} ★`
										: "N/A"
								}
							/>
							<div className="border-t pt-3">
								<StatRow
									label="Reported"
									value={reviews.reported}
									color="text-red-600"
								/>
								<StatRow
									label="Unapproved"
									value={reviews.unapproved}
									color="text-yellow-600"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Orders */}
			<RecentOrdersTable
				orders={recentOrders}
				showUser
				showPayment
				title="Recent Orders (Platform-wide)"
			/>
		</div>
	);
};

const StatRow = ({
	label,
	value,
	color,
	icon,
}: {
	label: string;
	value: string | number;
	color?: string;
	icon?: React.ReactNode;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-1">
			{icon}
			<span className={`text-sm ${color || "text-muted-foreground"}`}>
				{label}
			</span>
		</div>
		<span className={`text-sm font-semibold ${color || ""}`}>{value}</span>
	</div>
);

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

export default AdminDashboard;
