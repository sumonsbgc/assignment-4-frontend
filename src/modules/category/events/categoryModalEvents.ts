import { ICategory } from "@/models/Models";

// Event names
export const CATEGORY_MODAL_EVENTS = {
	OPEN_CREATE: "category:open-create",
	OPEN_EDIT: "category:open-edit",
} as const;

// Event detail types
export interface OpenCreateCategoryEvent extends CustomEvent {
	detail: undefined;
}

export interface OpenEditCategoryEvent extends CustomEvent {
	detail: {
		category: ICategory;
	};
}

// Dispatch functions
export const dispatchOpenCreateCategory = () => {
	const event = new CustomEvent(CATEGORY_MODAL_EVENTS.OPEN_CREATE);
	window.dispatchEvent(event);
};

export const dispatchOpenEditCategory = (category: ICategory) => {
	const event = new CustomEvent(CATEGORY_MODAL_EVENTS.OPEN_EDIT, {
		detail: { category },
	});
	window.dispatchEvent(event);
};
