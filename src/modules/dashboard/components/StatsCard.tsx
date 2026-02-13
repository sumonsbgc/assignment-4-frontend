import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
	title: string;
	value: string | number;
	description?: string;
	icon: LucideIcon;
	trend?: {
		value: number;
		label: string;
	};
	className?: string;
}

export const StatsCard = ({
	title,
	value,
	description,
	icon: Icon,
	trend,
	className,
}: StatsCardProps) => {
	const isPositive = trend && trend.value >= 0;

	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				{description && (
					<p className="text-xs text-muted-foreground mt-1">{description}</p>
				)}
				{trend && (
					<p
						className={`text-xs mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}
					>
						{isPositive ? "+" : ""}
						{trend.value.toFixed(1)}% {trend.label}
					</p>
				)}
			</CardContent>
		</Card>
	);
};
