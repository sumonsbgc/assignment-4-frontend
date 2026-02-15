import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, XCircle } from "lucide-react";

export type ConfirmModalProps = {
	title: string;
	description: string | React.ReactNode;
	confirmText?: string;
	cancelText?: string;
	variant?: "danger" | "warning" | "default";
	onConfirm: () => void;
	onCancel: () => void;
};

const iconMap = {
	danger: <Trash2 className="h-12 w-12 text-red-500" />,
	warning: <AlertTriangle className="h-12 w-12 text-orange-500" />,
	default: <XCircle className="h-12 w-12 text-gray-500" />,
};

export const ConfirmModal = ({
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	variant = "danger",
	onConfirm,
	onCancel,
}: ConfirmModalProps) => {
	return (
		<div className="p-6 w-full max-w-lg mx-auto text-center">
			<div className="flex justify-center mb-4">{iconMap[variant]}</div>
			<h2 className="text-2xl font-semibold mb-2">{title}</h2>
			<p className="text-gray-600 mb-6 text-base">{description}</p>
			<div className="flex gap-3 justify-center">
				<Button
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						onCancel();
					}}
					className="pointer-events-auto cursor-pointer"
				>
					{cancelText}
				</Button>
				<Button
					variant={variant === "danger" ? "destructive" : "default"}
					onClick={(e) => {
						e.stopPropagation();
						onConfirm();
					}}
					className="pointer-events-auto cursor-pointer"
				>
					{confirmText}
				</Button>
			</div>
		</div>
	);
};
