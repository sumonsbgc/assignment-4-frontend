"use client";

import { EditForm } from "./EditForm";
import { getCategoriesExcluding } from "../services";
import { ICategory } from "@/models/Models";
import { use, useMemo } from "react";
import CategoryModal from "../modal/CategoryModal";

type EditCategoryProps = {
	category: ICategory;
	isOpen: boolean;
};

export const EditCategory = ({ category, isOpen }: EditCategoryProps) => {
	const categoriesPromise = useMemo(
		() => (isOpen ? getCategoriesExcluding(category.id) : Promise.resolve([])),
		[isOpen, category.id],
	);
	const categories = use(categoriesPromise);

	return (
		<CategoryModal
			label="Edit Category"
			title="Edit Category"
			description="Update category information and settings"
		>
			<EditForm category={category} categories={categories} />
		</CategoryModal>
	);
};
