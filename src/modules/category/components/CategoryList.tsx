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
import Image from "next/image";

export const CategoryList = ({ categories }: { categories: ICategory[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Image</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Products</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{categories.map((category) => (
					<TableRow key={category.id}>
						<TableCell>
							<div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
								{category.image ? (
									<Image
										src={category.image}
										alt={category.name}
										fill
										className="object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center">
										<Layers className="w-6 h-6 text-gray-400" />
									</div>
								)}
							</div>
						</TableCell>
						<TableCell className="font-medium">{category.name}</TableCell>
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
