import type { Medicine } from "../types";

export const MEDICINE_MODAL_EVENTS = {
	OPEN_CREATE: "medicine:open-create",
	OPEN_EDIT: "medicine:open-edit",
} as const;

export interface OpenEditMedicineEvent extends CustomEvent {
	detail: {
		medicine: Medicine;
	};
}

export const dispatchOpenCreateMedicine = () => {
	const event = new CustomEvent(MEDICINE_MODAL_EVENTS.OPEN_CREATE);
	window.dispatchEvent(event);
};

export const dispatchOpenEditMedicine = (medicine: Medicine) => {
	const event = new CustomEvent(MEDICINE_MODAL_EVENTS.OPEN_EDIT, {
		detail: { medicine },
	});
	window.dispatchEvent(event);
};
