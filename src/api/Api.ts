import { HttpClient, RequestOptions, ResponseData } from "./type";
import { FetchClient } from "./FetchClient";
import config from "@/lib/config";

class Api {
	private static instances: Map<string, Api> = new Map();
	private readonly baseUrl: string;
	private readonly client: HttpClient;

	private constructor(baseUrl: string, prefix?: string, version?: string) {
		this.baseUrl = baseUrl;
		this.client = new FetchClient(this.baseUrl, prefix, version);
	}

	public static getInstance(
		baseUrl: string,
		prefix?: string,
		version?: string,
	): Api {
		const key = `${baseUrl}-${prefix ?? ""}-${version ?? ""}`;
		if (!Api.instances.has(key)) {
			Api.instances.set(key, new Api(baseUrl, prefix, version));
		}
		return Api.instances.get(key)!;
	}

	public get<T = unknown>(
		endpoint: string,
		options?: RequestOptions,
	): Promise<ResponseData<T>> {
		return this.client.request<T>("GET", endpoint, undefined, options);
	}

	public post<T = unknown>(
		endpoint: string,
		body?: unknown,
		options?: RequestOptions,
	): Promise<ResponseData<T>> {
		return this.client.request<T>("POST", endpoint, body, options);
	}

	public put<T = unknown>(
		endpoint: string,
		body?: unknown,
		options?: RequestOptions,
	): Promise<ResponseData<T>> {
		return this.client.request<T>("PUT", endpoint, body, options);
	}

	public delete<T = unknown>(
		endpoint: string,
		body?: unknown,
		options?: RequestOptions,
	): Promise<ResponseData<T>> {
		return this.client.request<T>("DELETE", endpoint, body, options);
	}

	public patch<T = unknown>(
		endpoint: string,
		body?: unknown,
		options?: RequestOptions,
	): Promise<ResponseData<T>> {
		return this.client.request<T>("PATCH", endpoint, body, options);
	}
}

export const api = Api.getInstance(config.apiUrl, "api");
export const api2 = Api.getInstance(config.apiUrl, "api", "v2");
