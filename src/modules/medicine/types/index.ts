// Request Bodies
export interface CreateMedicineBody {
	name: string;
	description?: string;
	genericName?: string;
	manufacturer: string;
	price: number;
	discountPrice?: number;
	discountPercentage?: number;
	stockQuantity?: number;
	lowStockThreshold?: number;
	unit?: string;
	imageUrl?: string;
	images?: string[];
	dosageForm?: string;
	strength?: string;
	packSize?: string;
	requiresPrescription?: boolean;
	expiryDate?: string;
	ingredients?: string;
	sideEffects?: string;
	warnings?: string;
	storage?: string;
	categoryId: string;
	sellerId?: string;
	isFeatured?: boolean;
}

export interface UpdateMedicineBody {
	name?: string;
	description?: string;
	genericName?: string;
	manufacturer?: string;
	price?: number;
	discountPrice?: number | null;
	discountPercentage?: number | null;
	stockQuantity?: number;
	lowStockThreshold?: number;
	unit?: string;
	imageUrl?: string;
	images?: string[];
	dosageForm?: string;
	strength?: string;
	packSize?: string;
	requiresPrescription?: boolean;
	expiryDate?: string | null;
	ingredients?: string;
	sideEffects?: string;
	warnings?: string;
	storage?: string;
	categoryId?: string;
	isActive?: boolean;
	isFeatured?: boolean;
}

export interface MedicineFilters {
	page?: number;
	limit?: number;
	search?: string;
	categoryId?: string;
	sellerId?: string;
	manufacturer?: string;
	minPrice?: number;
	maxPrice?: number;
	isActive?: boolean;
	isFeatured?: boolean;
	inStock?: boolean;
	sortBy?: "price" | "name" | "createdAt";
	sortOrder?: "asc" | "desc";
}

// API Response Types
export interface PaginationData {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasMore: boolean;
}

export interface MedicineCategory {
	id: string;
	name: string;
	slug: string;
}

export interface MedicineSeller {
	id: string;
	name: string;
	email: string;
}

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
	category: MedicineCategory;
	sellerId: string;
	seller: MedicineSeller;
	isActive: boolean;
	isFeatured: boolean;
	createdAt: string;
	updatedAt: string;
}

// API Response Structures
export interface MedicineAPIResponse {
	success: boolean;
	data: Medicine[];
	pagination?: PaginationData;
}

export interface SingleMedicineAPIResponse {
	success: boolean;
	data: Medicine;
	message?: string;
}

// Service Return Types
export interface GetMedicinesResponse {
	status: boolean;
	message: string;
	medicines: Medicine[];
	pagination?: PaginationData;
}

export interface CreateMedicineResponse {
	status: boolean;
	message: string;
	data: Medicine | null;
}

export interface UpdateMedicineResponse {
	status: boolean;
	message: string;
	data: Medicine | null;
}

export interface DeleteMedicineResponse {
	status: boolean;
	message: string;
}
