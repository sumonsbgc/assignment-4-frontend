import {
	Package,
	DollarSign,
	Star,
	TrendingUp,
	AlertTriangle,
	ShoppingBag,
	Clock,
	Truck,
	CheckCircle,
	XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getSellerDashboard } from "./services";
import { StatsCard } from "./components";
import Link from "next/link";

const formatCurrency = (amount: number) =>
	`৳${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const SellerDashboard = async () => {
	const data = await getSellerDashboard();

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
		products,
		revenue,
		orders,
		reviews,
		lowStockProducts,
		topSellingProducts,
	} = data;

	const revenueTrend =
		revenue.lastMonth > 0
			? ((revenue.thisMonth - revenue.lastMonth) / revenue.lastMonth) * 100
			: 0;

	return (
		<div className="flex flex-1 flex-col gap-6 p-4">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold">Seller Dashboard</h1>
				<p className="text-muted-foreground">
					Overview of your store performance and inventory.
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatsCard
					title="Total Products"
					value={products.total}
					description={`${products.active} active, ${products.inactive} inactive`}
					icon={Package}
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
					title="Items Sold"
					value={orders.totalOrderItems}
					description={`${orders.delivered} delivered, ${orders.pending} pending`}
					icon={ShoppingBag}
				/>
				<StatsCard
					title="Product Reviews"
					value={reviews.total}
					description={
						reviews.total > 0
							? `Average: ${reviews.averageRating.toFixed(1)} ★`
							: "No reviews yet"
					}
					icon={Star}
				/>
			</div>

			{/* Product & Order Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Product Status */}
				<Card>
					<CardHeader>
						<CardTitle>Product Status</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">Active</span>
								<span className="text-sm font-semibold">{products.active}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">Inactive</span>
								<span className="text-sm font-semibold">
									{products.inactive}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">Featured</span>
								<span className="text-sm font-semibold">
									{products.featured}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1">
									<AlertTriangle className="h-3.5 w-3.5 text-red-500" />
									<span className="text-sm text-red-600">Out of Stock</span>
								</div>
								<span className="text-sm font-semibold text-red-600">
									{products.outOfStock}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1">
									<AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
									<span className="text-sm text-yellow-600">Low Stock</span>
								</div>
								<span className="text-sm font-semibold text-yellow-600">
									{products.lowStock}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Order Stats */}
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
						</div>
					</CardContent>
				</Card>

				{/* Revenue Breakdown */}
				<Card>
					<CardHeader>
						<CardTitle>Revenue</CardTitle>
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
							<div className="border-t pt-4">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Avg. Order Value</span>
									<span className="text-sm font-semibold">
										{formatCurrency(revenue.averageOrderItemValue)}
									</span>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">All-time Total</span>
								<span className="text-lg font-bold">
									{formatCurrency(revenue.totalRevenue)}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Top Selling + Low Stock */}
			<div className="grid gap-4 md:grid-cols-2">
				{/* Top Selling Products */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<TrendingUp className="h-4 w-4" />
							<CardTitle>Top Selling Products</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						{topSellingProducts.length === 0 ? (
							<p className="text-sm text-muted-foreground text-center py-6">
								No sales data yet
							</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead className="text-right">Sold</TableHead>
										<TableHead className="text-right">Revenue</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{topSellingProducts.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<Link
													href={`/seller/medicines/${product.id}`}
													className="font-medium text-sm hover:underline"
												>
													{product.name}
												</Link>
											</TableCell>
											<TableCell className="text-right">
												{product.totalSold}
											</TableCell>
											<TableCell className="text-right">
												{formatCurrency(product.revenue)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>

				{/* Low Stock Alert */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<AlertTriangle className="h-4 w-4 text-yellow-500" />
							<CardTitle>Low Stock Alert</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						{lowStockProducts.length === 0 ? (
							<p className="text-sm text-muted-foreground text-center py-6">
								All products are well stocked
							</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead className="text-right">Stock</TableHead>
										<TableHead className="text-right">Threshold</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{lowStockProducts.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<Link
													href={`/seller/medicines/${product.id}`}
													className="font-medium text-sm hover:underline"
												>
													{product.name}
												</Link>
											</TableCell>
											<TableCell className="text-right">
												<Badge
													variant={
														product.stockQuantity <= 5
															? "destructive"
															: "secondary"
													}
												>
													{product.stockQuantity}
												</Badge>
											</TableCell>
											<TableCell className="text-right text-sm text-muted-foreground">
												{product.lowStockThreshold}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
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

export default SellerDashboard;
