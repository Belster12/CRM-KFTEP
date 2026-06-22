"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboardIcon, 
  ListIcon, 
  UsersIcon, 
  Settings2Icon, 
  DatabaseIcon, 
  CommandIcon,
  ReceiptIcon, // Для транзакцій
  TagsIcon     // Для категорій
} from "lucide-react"

const data = {
  user: {
    name: "KFKEP",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Головна",
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Клієнти",
      url: "/students",
      icon: <UsersIcon />,
    },
    {
      title: "Замовлення",
      url: "/orders",
      icon: <ListIcon />,
    },
    {
      title: "Фінанси",
      url: "/finance",
      icon: <DatabaseIcon />,
      // Робимо розділ активним за замовчуванням (якщо підтримується вашим NavMain)
      isActive: true, 
      // Додаємо вкладені пункти меню
      items: [
        {
          title: "Огляд (Дашборд)",
          url: "/finance",
        },
        {
          title: "Транзакції",
          url: "/finance/transaction", // або /finance/transactions відповідно до ваших роутів
          icon: <ReceiptIcon />,
        },
        {
          title: "Категорії",
          url: "/finance/categories",
          icon: <TagsIcon />,
        },
      ],
    },
  ],  
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">CRM</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}