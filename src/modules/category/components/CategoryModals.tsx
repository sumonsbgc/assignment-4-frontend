"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ICategory } from "@/models/Models";
import { CreateForm } from "./CreateForm";
import { EditForm } from "./EditForm";
import {
	CATEGORY_MODAL_EVENTS,
	OpenEditCategoryEvent,
} from "../events/categoryModalEvents";

type CategoryModalsProps = {
	categories: ICategory[];
};

type ModalState = {
	type: "create" | "edit" | null;
	category?: ICategory;
};

export const CategoryModals = ({ categories }: CategoryModalsProps) => {
	const [modal, setModal] = useState<ModalState>({ type: null });

	useEffect(() => {
		const handleCreate = () => setModal({ type: "create" });
		const handleEdit = (e: Event) => {
			const { category } = (e as OpenEditCategoryEvent).detail;
			setModal({ type: "edit", category });
		};

		window.addEventListener(CATEGORY_MODAL_EVENTS.OPEN_CREATE, handleCreate);
		window.addEventListener(CATEGORY_MODAL_EVENTS.OPEN_EDIT, handleEdit);

		return () => {
			window.removeEventListener(
				CATEGORY_MODAL_EVENTS.OPEN_CREATE,
				handleCreate,
			);
			window.removeEventListener(CATEGORY_MODAL_EVENTS.OPEN_EDIT, handleEdit);
		};
	}, []);

	const closeModal = () => setModal({ type: null });
	const availableCategories = modal.category
		? categories.filter((cat) => cat.id !== modal.category!.id)
		: categories;

	return (
		<>
			<Dialog open={modal.type === "create"} onOpenChange={closeModal}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Add New Category</DialogTitle>
						<DialogDescription>
							Create a new category for organizing medicines
						</DialogDescription>
					</DialogHeader>
					<CreateForm categories={categories} onSuccess={closeModal} />
				</DialogContent>
			</Dialog>

			<Dialog open={modal.type === "edit"} onOpenChange={closeModal}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Edit Category</DialogTitle>
						<DialogDescription>
							Update category information and settings
						</DialogDescription>
					</DialogHeader>
					{modal.category && (
						<EditForm
							category={modal.category}
							categories={availableCategories}
							onSuccess={closeModal}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
