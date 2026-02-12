"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ICategory } from "@/models/Models";
import type { Medicine } from "../types";
import { CreateForm } from "./CreateForm";
import { EditForm } from "./EditForm";
import {
	MEDICINE_MODAL_EVENTS,
	OpenEditMedicineEvent,
} from "../events/medicineModalEvents";

type MedicineModalsProps = {
	categories: ICategory[];
};

type ModalState = {
	type: "create" | "edit" | null;
	medicine?: Medicine;
};

export const MedicineModals = ({ categories }: MedicineModalsProps) => {
	const [modal, setModal] = useState<ModalState>({ type: null });

	useEffect(() => {
		const handleCreate = () => setModal({ type: "create" });
		const handleEdit = (e: Event) => {
			const { medicine } = (e as OpenEditMedicineEvent).detail;
			setModal({ type: "edit", medicine });
		};

		window.addEventListener(MEDICINE_MODAL_EVENTS.OPEN_CREATE, handleCreate);
		window.addEventListener(MEDICINE_MODAL_EVENTS.OPEN_EDIT, handleEdit);

		return () => {
			window.removeEventListener(
				MEDICINE_MODAL_EVENTS.OPEN_CREATE,
				handleCreate,
			);
			window.removeEventListener(MEDICINE_MODAL_EVENTS.OPEN_EDIT, handleEdit);
		};
	}, []);

	const closeModal = () => setModal({ type: null });

	return (
		<>
			<Dialog open={modal.type === "create"} onOpenChange={closeModal}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Add New Medicine</DialogTitle>
						<DialogDescription>
							Fill in the details to add a new medicine to your inventory
						</DialogDescription>
					</DialogHeader>
					<CreateForm categories={categories} onSuccess={closeModal} />
				</DialogContent>
			</Dialog>

			<Dialog open={modal.type === "edit"} onOpenChange={closeModal}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Edit Medicine</DialogTitle>
						<DialogDescription>
							Update medicine information and settings
						</DialogDescription>
					</DialogHeader>
					{modal.medicine && (
						<EditForm
							medicine={modal.medicine}
							categories={categories}
							onSuccess={closeModal}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
