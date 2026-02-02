const config = {
	appBaseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
	apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
	frontEndUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
};

export default config;
