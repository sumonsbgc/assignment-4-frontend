export type ICart = {
	id: string;
	userId: string;
	medicineId: string;
	quantity: number;
	medicine: {
		id: string;
		name: string;
		slug: string;
		price: number;
		discountPrice: number;
		stockQuantity: number;
		imageUrl: string;
		category: {
			id: string;
			name: string;
		};
	};
	createdAt: Date;
	updatedAt: Date;
};
