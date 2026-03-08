"use client";

import * as React from "react";
import {
  BarChart3,
  DollarSign,
  Egg,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Beef,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
import { Link } from "react-router-dom";

const data = {
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      {/* Header / Brand */}
      <SidebarHeader className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="" className="flex items-center gap-3 px-1">
                {/* Logo mark */}
                <div className="relative flex aspect-square size-9 items-center justify-center rounded-xl overflow-hidden shadow-sm shrink-0">
                  {/* gradient background */}
                  <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-orange-500" />
                  <Beef className="relative size-5 text-white drop-shadow" />
                </div>

                {/* Brand text */}
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    GreenOva
                  </span>
                  <span className="truncate text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
                    Farm Management
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Nav items */}
      <SidebarContent className="py-4">
        {/* section label */}
        <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Main Menu
        </p>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer / User */}
      <SidebarFooter className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
