"use client"

import * as React from "react"
import { LayoutDashboard, MessageSquare, FileText, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { title } from "node:process"

const items = [
  {
    title: "Dashboard",
    url: "/main",
    icon: LayoutDashboard,
  },
  {
    title: "Chat",
    url: "/main/chat",
    icon: MessageSquare,
  },
  {
    title: "Resúmenes",
    url: "/main/summaries",
    icon: FileText,
  },
  {
    title: "Perfil",
    url: "/main/profile",
    icon: User,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-2 py-4">
          <div className="flex items-start gap-2">
            <Image
              width={176}
              height={28}
              alt=""
              src="/Imagenes/vantax_logo.svg"
            />
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-400"
              onClick={() => setOpenMobile(false)}
            >
              <X className="size-5" />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-400/60">
            Menú
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-blue-400/10 hover:text-blue-400 data-[active=true]:bg-blue-500/20 data-[active=true]:text-blue-400"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
