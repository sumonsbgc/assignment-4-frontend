"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/modules/shared/services/uploadImage";
import { getImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

type UploadFolder = "medicines" | "categories" | "users";

type ImageUploadProps = {
	value: string;
	onChange: (url: string) => void;
	folder: UploadFolder;
	label?: string;
	className?: string;
	/** Circle shape for avatar uploads */
	rounded?: boolean;
};

export const ImageUpload = ({
	value,
	onChange,
	folder,
	label = "Upload Image",
	className,
	rounded = false,
}: ImageUploadProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [dragActive, setDragActive] = useState(false);

	const imageUrl = value ? getImageUrl(value) : "";

	const handleUpload = useCallback(
		async (file: File) => {
			setError(null);
			setIsUploading(true);

			try {
				const formData = new FormData();
				formData.append("image", file);

				const result = await uploadImage(formData, folder);

				if (result.success && result.data) {
					onChange(result.data.url);
				} else {
					setError(result.message);
				}
			} catch {
				setError("Failed to upload image");
			} finally {
				setIsUploading(false);
			}
		},
		[folder, onChange],
	);

	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				handleUpload(file);
			}
			// Reset input so same file can be re-selected
			if (inputRef.current) {
				inputRef.current.value = "";
			}
		},
		[handleUpload],
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setDragActive(false);

			const file = e.dataTransfer.files?.[0];
			if (file && file.type.startsWith("image/")) {
				handleUpload(file);
			}
		},
		[handleUpload],
	);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setDragActive(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setDragActive(false);
	}, []);

	const handleRemove = useCallback(() => {
		onChange("");
		setError(null);
	}, [onChange]);

	return (
		<div className={cn("space-y-2", className)}>
			<input
				ref={inputRef}
				type="file"
				accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
				onChange={handleFileSelect}
				className="hidden"
			/>

			{imageUrl ? (
				/* Image Preview */
				<div className="relative group">
					<div
						className={cn(
							"relative overflow-hidden border-2 border-muted",
							rounded
								? "w-32 h-32 rounded-full mx-auto"
								: "w-full h-48 rounded-lg",
						)}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={imageUrl}
							alt="Preview"
							className="w-full h-full object-cover"
						/>

						{/* Overlay with actions */}
						<div
							className={cn(
								"absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
								rounded && "rounded-full",
							)}
						>
							<Button
								type="button"
								variant="secondary"
								size="sm"
								onClick={() => inputRef.current?.click()}
								disabled={isUploading}
							>
								{isUploading ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Upload className="w-4 h-4" />
								)}
							</Button>
							<Button
								type="button"
								variant="destructive"
								size="sm"
								onClick={handleRemove}
								disabled={isUploading}
							>
								<X className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>
			) : (
				/* Upload Dropzone */
				<div
					role="button"
					tabIndex={0}
					onClick={() => inputRef.current?.click()}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							inputRef.current?.click();
						}
					}}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					className={cn(
						"border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary",
						dragActive
							? "border-primary bg-primary/5 text-primary"
							: "border-muted-foreground/25",
						rounded
							? "w-32 h-32 rounded-full mx-auto"
							: "w-full h-36 rounded-lg",
					)}
				>
					{isUploading ? (
						<>
							<Loader2 className="w-8 h-8 animate-spin" />
							<span className="text-xs">Uploading...</span>
						</>
					) : (
						<>
							<ImageIcon className="w-8 h-8" />
							<span className="text-xs text-center px-2">{label}</span>
						</>
					)}
				</div>
			)}

			{error && <p className="text-xs text-destructive text-center">{error}</p>}
		</div>
	);
};
