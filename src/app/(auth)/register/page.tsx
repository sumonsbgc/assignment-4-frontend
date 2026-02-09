import { RegisterForm } from "@/modules/auth/register/RegisterForm";

export const metadata = {
	title: "Register - MediStore",
	description:
		"Create a new MediStore account to start shopping for medicines and healthcare products with fast delivery and exclusive offers.",
};

export default async function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<RegisterForm />
			</div>
		</div>
	);
}
