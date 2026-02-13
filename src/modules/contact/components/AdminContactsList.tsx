"use client";

import { useState } from "react";
import { aark } from "aark-react-modalify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Eye, Trash2, Loader2 } from "lucide-react";
import dayjs from "dayjs";
import type { Contact } from "@/modules/contact/services/getContacts";
import {
	updateContactStatus,
	deleteContactMessage,
} from "@/modules/contact/services/getContacts";
import { useRouter } from "next/navigation";

const statusColors: Record<string, string> = {
	UNREAD: "bg-red-100 text-red-700",
	READ: "bg-blue-100 text-blue-700",
	REPLIED: "bg-green-100 text-green-700",
};

function MessageDetailModal({
	contact,
	onClose,
}: {
	contact: Contact;
	onClose: () => void;
}) {
	return (
		<div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/30 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
				<div className="p-6 space-y-4">
					<div className="flex items-start justify-between">
						<h3 className="text-lg font-semibold">{contact.subject}</h3>
						<Badge className={statusColors[contact.status]}>
							{contact.status}
						</Badge>
					</div>
					<div className="space-y-2 text-sm text-gray-600">
						<p>
							<span className="font-medium text-gray-900">From:</span>{" "}
							{contact.name}
						</p>
						<p>
							<span className="font-medium text-gray-900">Email:</span>{" "}
							{contact.email}
						</p>
						{contact.phone && (
							<p>
								<span className="font-medium text-gray-900">Phone:</span>{" "}
								{contact.phone}
							</p>
						)}
						<p>
							<span className="font-medium text-gray-900">Date:</span>{" "}
							{dayjs(contact.createdAt).format("DD MMM YYYY, hh:mm A")}
						</p>
					</div>
					<div className="border-t pt-4">
						<p className="text-sm font-medium text-gray-900 mb-2">Message:</p>
						<p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
							{contact.message}
						</p>
					</div>
					<div className="flex justify-end pt-2">
						<Button variant="outline" onClick={onClose}>
							Close
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function AdminContactsList({
	contacts,
}: {
	contacts: Contact[];
}) {
	const router = useRouter();
	const [loadingId, setLoadingId] = useState<string | null>(null);

	const handleView = async (contact: Contact) => {
		aark.fire(
			<MessageDetailModal contact={contact} onClose={() => aark.close()} />,
		);

		// Mark as read if currently unread
		if (contact.status === "UNREAD") {
			await updateContactStatus(contact.id, "READ");
			router.refresh();
		}
	};

	const handleStatusChange = async (id: string, status: string) => {
		setLoadingId(id);
		const res = await updateContactStatus(id, status);
		if (res.success) {
			aark.notification({
				title: "Status Updated",
				text: res.message,
				type: "success",
			});
			router.refresh();
		} else {
			aark.notification({
				title: "Error",
				text: res.message,
				type: "error",
			});
		}
		setLoadingId(null);
	};

	const handleDelete = (contact: Contact) => {
		aark.fire(
			<div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/30 p-4">
				<div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
					<h3 className="text-lg font-semibold">Delete Message</h3>
					<p className="text-sm text-gray-600">
						Are you sure you want to delete the message from{" "}
						<strong>{contact.name}</strong>? This action cannot be undone.
					</p>
					<div className="flex justify-end gap-2">
						<Button variant="outline" onClick={() => aark.close()}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={async () => {
								const res = await deleteContactMessage(contact.id);
								aark.close();
								if (res.success) {
									aark.notification({
										title: "Deleted",
										text: res.message,
										type: "success",
									});
									router.refresh();
								} else {
									aark.notification({
										title: "Error",
										text: res.message,
										type: "error",
									});
								}
							}}
						>
							Delete
						</Button>
					</div>
				</div>
			</div>,
		);
	};

	if (contacts.length === 0) {
		return (
			<div className="text-center py-12 text-gray-500">
				<p className="text-lg font-medium">No messages found</p>
				<p className="text-sm">Contact form submissions will appear here.</p>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Subject</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Date</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{contacts.map((contact) => (
					<TableRow
						key={contact.id}
						className={contact.status === "UNREAD" ? "font-medium" : ""}
					>
						<TableCell>{contact.name}</TableCell>
						<TableCell className="text-sm text-gray-600">
							{contact.email}
						</TableCell>
						<TableCell className="max-w-50 truncate">
							{contact.subject}
						</TableCell>
						<TableCell>
							<Select
								defaultValue={contact.status}
								onValueChange={(val) => handleStatusChange(contact.id, val)}
								disabled={loadingId === contact.id}
							>
								<SelectTrigger className="w-27.5 h-8 text-xs">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="UNREAD">Unread</SelectItem>
									<SelectItem value="READ">Read</SelectItem>
									<SelectItem value="REPLIED">Replied</SelectItem>
								</SelectContent>
							</Select>
						</TableCell>
						<TableCell className="text-sm text-gray-500">
							{dayjs(contact.createdAt).format("DD MMM YYYY")}
						</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-1">
								{loadingId === contact.id && (
									<Loader2 className="h-4 w-4 animate-spin text-gray-400" />
								)}
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleView(contact)}
									title="View message"
								>
									<Eye className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleDelete(contact)}
									title="Delete message"
									className="text-red-500 hover:text-red-700"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
