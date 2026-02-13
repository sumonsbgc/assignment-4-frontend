import { Suspense } from "react";
import { Metadata } from "next";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getContacts } from "@/modules/contact/services/getContacts";
import AdminContactsList from "@/modules/contact/components/AdminContactsList";

export const metadata: Metadata = {
	title: "Contact Messages - Admin | MediStore",
	description: "Manage contact form submissions",
};

type PageProps = {
	searchParams: Promise<{
		page?: string;
		status?: string;
		search?: string;
	}>;
};

async function ContactsContent({
	searchParams,
}: {
	searchParams: { page?: string; status?: string; search?: string };
}) {
	const page = parseInt(searchParams.page || "1");
	const status = searchParams.status;
	const search = searchParams.search;

	const { contacts, pagination } = await getContacts({
		page,
		limit: 20,
		status,
		search,
	});

	return (
		<>
			<AdminContactsList contacts={contacts} />
			{pagination.totalPages > 1 && (
				<div className="flex items-center justify-between border-t px-4 py-3 text-sm text-gray-500">
					<span>
						Showing {contacts.length} of {pagination.total} messages
					</span>
					<span>
						Page {pagination.page} of {pagination.totalPages}
					</span>
				</div>
			)}
		</>
	);
}

function ContactsSkeleton() {
	return (
		<div className="space-y-3 p-4">
			{Array.from({ length: 5 }).map((_, i) => (
				<Skeleton key={i} className="h-12 w-full" />
			))}
		</div>
	);
}

export default async function AdminContactsPage({ searchParams }: PageProps) {
	const params = await searchParams;

	return (
		<div className="p-6">
			<Card>
				<CardHeader>
					<CardTitle>Contact Messages</CardTitle>
					<CardDescription>
						View and manage messages submitted through the contact form.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<ContactsSkeleton />}>
						<ContactsContent searchParams={params} />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}
