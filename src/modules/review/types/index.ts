// Review Types

export interface ReviewUser {
	id: string;
	name: string;
	email: string;
}

export interface ReviewMedicine {
	id: string;
	name: string;
	slug: string;
	imageUrl: string | null;
}

export interface IReview {
	id: string;
	userId: string;
	medicineId: string;
	parentId: string | null;
	rating: number | null;
	title: string | null;
	comment: string | null;
	isVerified: boolean;
	isApproved: boolean;
	isReported: boolean;
	createdAt: string;
	updatedAt: string;
	user: ReviewUser;
	medicine?: ReviewMedicine;
	replies?: IReview[];
}

export interface ReviewStats {
	reviews: IReview[];
	averageRating: number;
	totalReviews: number;
	ratingDistribution: {
		1: number;
		2: number;
		3: number;
		4: number;
		5: number;
	};
}

export interface ReviewPagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasMore: boolean;
}

export interface CreateReviewDto {
	medicineId: string;
	rating: number;
	comment: string;
	parentId?: string;
}

export interface UpdateReviewDto {
	rating?: number;
	comment?: string;
}

// API Response Types
export interface ReviewAPIResponse {
	success: boolean;
	data: IReview;
	message?: string;
}

export interface ReviewListAPIResponse {
	success: boolean;
	data: IReview[];
	pagination: ReviewPagination;
}

export interface ReviewStatsAPIResponse {
	success: boolean;
	data: ReviewStats;
}

export interface UserReviewsAPIResponse {
	success: boolean;
	data: IReview[];
}

// Service Return Types
export interface CreateReviewResponse {
	status: boolean;
	message: string;
	data: IReview | null;
}

export interface UpdateReviewResponse {
	status: boolean;
	message: string;
	data: IReview | null;
}

export interface DeleteReviewResponse {
	status: boolean;
	message: string;
}

export interface GetMedicineReviewsResponse {
	status: boolean;
	message: string;
	reviews: IReview[];
	pagination: ReviewPagination;
}

export interface GetReviewStatsResponse {
	status: boolean;
	message: string;
	stats: ReviewStats | null;
}

export interface GetUserReviewsResponse {
	status: boolean;
	message: string;
	reviews: IReview[];
}
