import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { Layers2 } from "lucide-react";
import { CreativeCommons } from "lucide-react";

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
          <Button>Create New Course</Button>
        </SidebarGroup>
        <SidebarGroup >
          <SidebarGroupContent>
            <SidebarMenu>
                 {SidebarOptions.map((option) => (
            <Button className={"my-1 cursor-pointer"} key={option.name}>
              {option.icon && <option.icon />}
              {option.name}
            </Button>
          ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
