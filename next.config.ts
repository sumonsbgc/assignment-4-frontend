import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "*",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "5000",
				pathname: "/uploads/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/auth/:path*",
				destination: `${process.env.BACKEND_URL}/api/auth/:path*`,
			},
			{
				source: "/api/v1/:path*",
				destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
			},
		];
	},
};

export default nextConfig;
