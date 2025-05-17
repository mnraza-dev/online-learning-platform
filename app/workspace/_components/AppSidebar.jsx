import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader >
        <Image src={"/logo.svg"} alt="Logo" width={100} height={100}/>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
