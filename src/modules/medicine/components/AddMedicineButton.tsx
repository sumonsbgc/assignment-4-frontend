"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { dispatchOpenCreateMedicine } from "../events/medicineModalEvents";

export const AddMedicineButton = () => {
	return (
		<Button onClick={dispatchOpenCreateMedicine}>
			<Plus className="w-4 h-4 mr-2" />
			Add Medicine
		</Button>
	);
};
