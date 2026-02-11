import CategoryModal from "../modal/CategoryModal";
import { getCategories } from "../services";
import { CreateForm } from "./CreateForm";

export const AddCategory = async () => {
	const { categories } = await getCategories({ isActive: true }); // Fetch categories if needed for the form (e.g., for parent category selection)
	return (
		<CategoryModal
			label="Add Category"
			title="Add New Category"
			description="Create a new category for organizing medicines"
		>
			<CreateForm categories={categories} />
		</CategoryModal>
	);
};
