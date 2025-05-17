import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { Layers2 } from "lucide-react";
import { CreativeCommons } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  const SidebarOptions = [
    {
      name: "Dashbaord",
      icon: LayoutDashboard,
    },
    {
      name: "Create New Course",
      icon: CreativeCommons,
    },
    {
      name: "My Courses",
      icon: Layers2,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <Image src={"/logo.svg"} alt="Logo" width={140} height={120} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button variant={"outline"}>Create New Course</Button>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((option) => (
                <SidebarMenu key={option.name}>
                  <SidebarMenuButton asChild>
                    <Link href="/">
                      {option.icon && <option.icon />}
                      {option.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenu>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
