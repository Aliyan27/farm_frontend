"use client";

import * as React from "react";
import {
  BarChart3,
  Command,
  DollarSign,
  Egg,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Send,
  ShoppingCart,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import RouteNames from "@/routes/RouteNames";

const data = {
  user: {
    name: "Malik",
    email: "malik@example.com",
    avatar: "/avatars/malik.jpg", // optional
  },
  navMain: [
    {
      title: "Dashboard",
      url: RouteNames.dashboard,
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Expenses",
      url: RouteNames.expenses,
      icon: DollarSign,
    },
    {
      title: "Feed Purchases",
      url: RouteNames.feedPurchase,
      icon: Package,
    },
    {
      title: "Egg Production",
      url: RouteNames.eggProduction,
      icon: Egg,
    },
    {
      title: "Egg Sales",
      url: RouteNames.eggSale,
      icon: ShoppingCart,
    },
    {
      title: "Salaries",
      url: RouteNames.salaries,
      icon: Users,
    },
    {
      title: "Reports",
      url: RouteNames.report,
      icon: BarChart3,
    },
  ],
  // Keep your navSecondary and projects if needed, or remove them
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
