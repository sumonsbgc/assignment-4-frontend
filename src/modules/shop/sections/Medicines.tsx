import React from "react";
import { Medicine } from "../types";

type IMedicinesProps = {
	medicines: Medicine[];
};

const Medicines = ({ medicines }: IMedicinesProps) => {
	console.log("Medicines component received medicines:", medicines);
	return <div>Medicines</div>;
};

export default Medicines;
