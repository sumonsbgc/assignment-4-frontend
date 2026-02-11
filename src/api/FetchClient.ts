import { HeaderManager } from "./HeaderManager";
import {
	HttpClient,
	HttpMethod,
	IURLBuilder,
	RequestOptions,
	ResponseData,
} from "./type";
import { UrlBuilder } from "./URLBuilder";

export class FetchClient implements HttpClient {
	private urlBuilder: IURLBuilder;

	constructor(
		private baseUrl: string,
		private prefix?: string,
		private version?: string,
	) {
		this.urlBuilder = new UrlBuilder(this.baseUrl, this.prefix, this.version);
	}

	async request<T = unknown>(
		method: HttpMethod,
		url: string,
		body?: unknown,
		options: RequestOptions = {},
	): Promise<ResponseData<T>> {
		try {
			const headers = new HeaderManager(options.headers);
			const fullUrl = this.urlBuilder.buildURL(url, options.params);

			const init: RequestInit = {
				method,
				headers: headers.getHeaders(),
				next: options.next,
				cache: options.cache,
				...(options.timeout && {
					signal: AbortSignal.timeout(options.timeout),
				}),
			};

			if (
				body &&
				(method === "POST" || method === "PUT" || method === "PATCH")
			) {
				if (body instanceof FormData) {
					init.body = body;
					delete (init.headers as Record<string, string>)["Content-Type"];
				} else if (body instanceof URLSearchParams) {
					init.body = body;
					(init.headers as Record<string, string>)["Content-Type"] =
						"application/x-www-form-urlencoded";
				} else if (typeof body === "string") {
					init.body = body;
				} else {
					init.body = JSON.stringify(body);
				}
			}

			const response = await fetch(fullUrl, init);

			let data: T | null = null;
			const contentType = response.headers.get("Content-Type");

			if (contentType && contentType.includes("application/json")) {
				data = await response.json();
			} else if (contentType && contentType.includes("text/")) {
				data = (await response.text()) as unknown as T;
			}

			if (!response.ok) {
				return {
					success: false,
					status: response.status,
					error: `HTTP ${response.status}: ${response.statusText}`,
					data: data,
				};
			}

			return {
				success: true,
				status: response.status,
				data: data ?? null,
			};
		} catch (error) {
			return {
				success: false,
				status: 500,
				error: (error as Error).message,
			};
		}
	}
}
