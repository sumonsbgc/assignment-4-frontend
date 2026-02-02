import React from "react";

const BannerSection = () => {
	return (
		<section className="bg-linear-to-r from-green-600 to-teal-700 text-white py-12 md:py-16">
			<div className="container mx-auto px-4">
				<h1 className="text-3xl md:text-4xl font-bold mb-4">Shop Medicines</h1>
				<p className="text-green-100 text-lg">
					Browse our wide range of quality medicines and healthcare products
				</p>
			</div>
		</section>
	);
};

export default BannerSection;
