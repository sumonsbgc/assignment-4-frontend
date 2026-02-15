"use client";

import { aark } from "aark-react-modalify";
import "aark-react-modalify/css";

const Components = () => {
	const openModal = () => {
		aark.fire(<PaymentFailModal />, {
			showCloseIcon: false,
			preventEscClose: true,
			preventOverlayClose: true,
		});
	};

	return (
		<div>
			<h1>Components Page</h1>
			<hr />
			<button onClick={openModal}>Click Me</button>
		</div>
	);
};

export default Components;

export const PaymentFailModal = () => {
	return (
		<div className="p-6 w-full max-w-lg mx-auto text-center">
			<h1>Payment Failed</h1>
			<p>Your payment could not be processed. Please try again.</p>
			<button onClick={() => aark.close()}>Close</button>
		</div>
	);
};
