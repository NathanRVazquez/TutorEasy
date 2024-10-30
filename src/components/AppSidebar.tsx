import { House, Users, BookCopy, Notebook, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Link from "next/link";

import SessionButton from "@/components/SessionButton";

// Menu items.
const navLinks = [
  {
    href: "/dashboard",
    title: "Home",
    icon: House,
  },
  {
    href: "/dashboard/classes",
    title: "Classes",
    icon: BookCopy,
    items: [
      {
        href: "/dashboard/classes/1",
        title: "Class 1",
      },
      {
        href: "/dashboard/classes/2",
        title: "Class 2",
      },
      {
        href: "/dashboard/classes/3",
        title: "Class 3",
      },
    ],
  },
  {
    href: "/dashboard/tutors",
    title: "Tutors",
    icon: Users,
  },
  {
    href: "/dashboard/tutoring-sessions",
    title: "Sessions",
    icon: Notebook,
  },
];
// Add way to fetch all classes from professor/TA, may have to create api route and return from there to be mapped

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h1 className="font-bold text-2xl">TutorEasy</h1>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => {
                if (item.href === "/dashboard/classes") {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                              <Link href={item.href}>
                                <item.icon />
                                <span className="font-bold">{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {/* Map through all classes of professor/TA */}
                            <SidebarMenuButton asChild>
                              <Link href={`${item.href}/:classId`}>
                                <span className="font-bold">Class 1</span>
                              </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton asChild>
                              <Link href={`${item.href}/:classId`}>
                                <span className="font-bold">Class 2</span>
                              </Link>
                            </SidebarMenuButton>
                            {/* End of map */}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon />
                        <span className="font-bold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="space-y-2">
          <SessionButton />
          <SidebarSeparator />
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} TutorEasy
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
