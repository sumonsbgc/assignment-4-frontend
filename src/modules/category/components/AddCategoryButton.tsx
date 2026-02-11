"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { dispatchOpenCreateCategory } from "../events/categoryModalEvents";

export const AddCategoryButton = () => {
	return (
		<Button onClick={dispatchOpenCreateCategory}>
			<Plus className="w-4 h-4 mr-2" />
			Add Category
		</Button>
	);
};
