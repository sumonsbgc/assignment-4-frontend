import { IHeaderManager } from "./type";

export class HeaderManager implements IHeaderManager {
	private headers: Record<string, string>;

	constructor(defaultHeaders?: Record<string, string>) {
		this.headers = {
			"Content-Type": "application/json",
			...defaultHeaders,
		};
	}

	getHeaders(): Record<string, string> {
		return this.headers;
	}

	setHeader(key: string, value: string): void {
		this.headers[key] = value;
	}

	setAuthToken(token: string): void {
		this.headers["Authorization"] = `Bearer ${token}`;
	}

	removeHeader(key: string): void {
		delete this.headers[key];
	}
}
