import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	console.log("Shop ID:", id);

	return <div>Shop Detail Page: {id}</div>;
};

export default Page;
