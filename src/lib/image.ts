import config from "@/lib/config";

/**
 * Get the full URL for an image path stored in the database.
 * Handles both absolute URLs (https://...) and relative paths (/uploads/...).
 */
export const getImageUrl = (path: string | null | undefined): string => {
	if (!path) return "";
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	return `${config.appBaseUrl}${path}`;
};
