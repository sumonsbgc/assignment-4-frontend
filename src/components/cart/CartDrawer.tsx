import { Sheet } from "../ui/sheet";
import CartTrigger from "./CartTrigger";
import CartContent from "./CartContent";
import { getCarts } from "@/modules/shared/services/carts/getCarts";

const CartDrawer = async () => {
	const { data: carts } = await getCarts();
	const itemCount = carts?.totalItems || 0;

	return (
		<Sheet>
			<CartTrigger itemCount={itemCount} />
			<CartContent carts={carts?.items || []} itemCount={itemCount} />
		</Sheet>
	);
};

export default CartDrawer;
