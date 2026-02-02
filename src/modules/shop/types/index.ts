export interface Medicine {
	id: string;
	name: string;
	slug: string;
	sku: string | null;
	description: string | null;
	genericName: string | null;
	manufacturer: string;
	price: number;
	discountPrice: number | null;
	discountPercentage: number | null;
	stockQuantity: number;
	lowStockThreshold: number;
	unit: string;
	imageUrl: string | null;
	images: string[];
	dosageForm: string | null;
	strength: string | null;
	packSize: string | null;
	requiresPrescription: boolean;
	expiryDate: string | null;
	ingredients: string | null;
	sideEffects: string | null;
	warnings: string | null;
	storage: string | null;
	categoryId: string;
	sellerId: string;
	category: {
		id: string;
		name: string;
		slug: string;
	};
	seller: {
		id: string;
		name: string;
		email: string;
	};
	isActive: boolean;
	isFeatured: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	description?: string;
	image?: string;
}

export interface Pagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasMore: boolean;
}

export interface GetMedicinesResponse {
	success: boolean;
	data: Medicine[];
	pagination: Pagination;
}

export interface CategoriesResponse {
	success: boolean;
	data: Category[];
}

export interface MedicineFilters {
	search?: string;
	categoryId?: string;
	minPrice?: number;
	maxPrice?: number;
	sortBy?: string;
	page?: number;
	limit?: number;
	inStock?: boolean;
	isFeatured?: boolean;
}
