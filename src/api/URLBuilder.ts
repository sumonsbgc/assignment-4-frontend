import { IURLBuilder } from "./type";

export class UrlBuilder implements IURLBuilder {
	constructor(
		private baseURL?: string,
		private prefix?: string,
		private version?: string,
	) {}

	setBaseURL(url: string): void {
		this.baseURL = url;
	}

	buildURL(
		endpoint: string,
		params?: Record<string, string | number | boolean>,
	): string {
		const parts: string[] = [];

		if (this.prefix) {
			parts.push(this.prefix.replace(/^\/+/, ""));
		}

		if (this.version) {
			parts.push(this.version.replace(/^\/+/, ""));
		}

		parts.push(endpoint.replace(/^\/+/, ""));

		const endpointWithPrefix = `/${parts.join("/")}`;

		const url = new URL(
			endpointWithPrefix,
			this.baseURL?.endsWith("/") ? this.baseURL : this.baseURL + "/",
		);

		console.log({ url, endpointWithPrefix });

		if (!params || Object.keys(params).length === 0) {
			return url.toString();
		}

		for (const [key, value] of Object.entries(params)) {
			url.searchParams.append(key, String(value));
		}

		return url.toString();
	}
}
