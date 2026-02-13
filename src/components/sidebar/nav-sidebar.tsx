import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { Role } from "@/lib/roles";
import { getSession } from "@/lib/getSession";
import { getMenusByRole } from "@/routes/routes";

const NavSidebar = async () => {
  const session = await getSession();
  const role = session?.user?.role || Role.CUSTOMER;
  const menus = getMenusByRole(role);

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {menus.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavSidebar;
