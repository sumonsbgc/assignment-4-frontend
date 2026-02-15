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
import { ConfirmModal } from "@/modules/shared/modals";

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
		<div className="p-6 w-full max-w-lg mx-auto text-center">
			<div className="p-6 space-y-4">
				<div className="flex items-start justify-between">
					<h3 className="text-2xl font-semibold">{contact.subject}</h3>
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
				text: "Message status has been updated",
				type: "success",
			});
			router.refresh();
		} else {
			aark.notification({
				title: "Update Failed",
				text: "Unable to update message status. Please try again.",
				type: "error",
			});
		}
		setLoadingId(null);
	};

	const handleDelete = (contact: Contact) => {
		aark.fire(
			<ConfirmModal
				title="Delete Message"
				description={
					<>
						Are you sure you want to delete the message from{" "}
						<strong>{contact.name}</strong>? This action cannot be undone.
					</>
				}
				confirmText="Delete"
				variant="danger"
				onConfirm={async () => {
					const res = await deleteContactMessage(contact.id);
					aark.close();
					if (res.success) {
						aark.notification({
							title: "Message Deleted",
							text: "The message has been removed successfully",
							type: "success",
						});
						router.refresh();
					} else {
						aark.notification({
							title: "Delete Failed",
							text: "Unable to delete message. Please try again.",
							type: "error",
						});
					}
				}}
				onCancel={() => aark.close()}
			/>,
			{
				showCloseIcon: false,
				preventEscClose: false,
				preventOverlayClose: true,
			},
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
