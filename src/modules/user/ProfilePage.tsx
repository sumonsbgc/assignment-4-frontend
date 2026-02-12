import { getMyProfile } from "./services/getMyProfile";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { ProfileEditForm } from "./components/ProfileEditForm";
import { redirect } from "next/navigation";

type ProfilePageProps = {
	title?: string;
	description?: string;
};

export const ProfilePage = async ({
	title = "My Profile",
	description = "Manage your account information",
}: ProfilePageProps) => {
	const { user } = await getMyProfile();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div>
				<h1 className="text-3xl font-bold">{title}</h1>
				<p className="text-gray-600">{description}</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				{/* Sidebar */}
				<div>
					<ProfileSidebar user={user} />
				</div>

				{/* Edit Form */}
				<div className="lg:col-span-3">
					<ProfileEditForm
						user={user}
						title="Personal Information"
						description="Update your personal details here"
					/>
				</div>
			</div>
		</div>
	);
};
