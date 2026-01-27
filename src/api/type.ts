export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Pick<RequestInit, "next" | "cache"> {
	headers?: Record<string, string>;
	params?: Record<string, string | number | boolean>;
	timeout?: number;
}

export interface ResponseData<T = unknown> {
	success: boolean;
	data?: T | null;
	error?: string;
	status: number;
}

export interface HttpClient {
	request<T = unknown>(
		method: HttpMethod,
		url: string,
		body?: unknown,
		options?: RequestOptions
	): Promise<ResponseData<T>>;
}

export interface IHeaderManager {
	getHeaders(): Record<string, string>;
	setHeader(key: string, value: string): void;
	setAuthToken(token: string): void;
	removeHeader(key: string): void;
}

export interface IURLBuilder {
	buildURL(
		endpoint: string,
		params?: Record<string, string | number | boolean>
	): string;
}
