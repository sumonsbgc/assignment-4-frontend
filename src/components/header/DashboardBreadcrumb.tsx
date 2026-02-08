"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

const DashboardBreadcrumb = () => {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const currentPage = segments[segments.length - 1] || "Dashboard";
	const parentSection = segments[0] || "Home";

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href={`/${parentSection}`}>
						{parentSection.charAt(0).toUpperCase() + parentSection.slice(1)}
					</BreadcrumbLink>
				</BreadcrumbItem>
				{segments.length > 1 && (
					<>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>
								{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default DashboardBreadcrumb;
