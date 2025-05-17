import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const SidebarOptions =[
    {
      name:"Create New Course",
      icon:""
    },
    {
      name:"My Courses",
      icon:""
    }
  ]
  return (
    <Sidebar>
      <SidebarHeader >
        <Image src={"/logo.svg"} alt="Logo" width={140} height={120}/>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <Button>
            Create New Course
          </Button>
          </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
