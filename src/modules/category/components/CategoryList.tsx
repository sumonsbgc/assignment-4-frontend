import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ICategory } from "@/models/Models";
import { Layers } from "lucide-react";
import { Action } from "./Action";

export const CategoryList = ({ categories }: { categories: ICategory[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Products</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{categories.map((category) => (
					<TableRow key={category.id}>
						<TableCell className="font-medium">
							<div className="flex items-center gap-2">
								<Layers className="w-4 h-4 text-gray-500" />
								{category.name}
							</div>
						</TableCell>
						<TableCell className="text-gray-600">
							{category.description}
						</TableCell>
						<TableCell>
							<span className="font-semibold">{category._count.medicines}</span>
						</TableCell>
						<TableCell className="text-right">
							<Action category={category} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
