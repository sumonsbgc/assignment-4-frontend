// Bodys matching backend
export interface CreateCategoryBody {
	name: string;
	slug: string;
	description?: string;
	image?: string;
	parentId?: string;
	order?: number;
}

export interface UpdateCategoryBody {
	name?: string;
	slug?: string;
	description?: string;
	image?: string;
	parentId?: string;
	order?: number;
	isActive?: boolean;
}

export interface CategoryFilters {
	isActive?: boolean;
	parentId?: string | null;
	search?: string;
	page?: number;
	limit?: number;
}

// API Response Types
export interface PaginationData {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasMore: boolean;
}

export interface CategoryParent {
	id: string;
	name: string;
	slug: string;
}

export interface CategoryChild {
	id: string;
	name: string;
	slug: string;
	isActive: boolean;
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	image: string | null;
	isActive: boolean;
	order: number;
	parentId: string | null;
	parent: CategoryParent | null;
	children: CategoryChild[];
	_count: {
		medicines: number;
	};
	createdAt: string;
	updatedAt: string;
}

// API Response Structures
export interface CategoryAPIResponse {
	success: boolean;
	data: Category[];
	pagination?: PaginationData;
}

export interface SingleCategoryAPIResponse {
	success: boolean;
	data: Category;
}

// Service Return Types
export interface GetCategoriesResponse {
	status: boolean;
	message: string;
	categories: Category[];
	pagination?: PaginationData;
}

export interface CreateCategoryResponse {
	status: boolean;
	message: string;
	data: Category | null;
}

export interface UpdateCategoryResponse {
	status: boolean;
	message: string;
	data: Category | null;
}

export interface DeleteCategoryResponse {
	status: boolean;
	message: string;
}
