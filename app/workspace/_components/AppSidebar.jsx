"use client";

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
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  const SidebarOptions = [
    {
      name: "Dashbaord",
      icon: LayoutDashboard,
      path: "/workspace",
    },
    {
      name: "My Learning",
      icon: Layers2,
      path: "/#",
    },
    {
      name: "Explore Courses",
      icon: Layers2,
      path: "/#",
    },
    {
      name: "AI Tools",
      icon: Layers2,
      path: "/#",
    },
    {
      name: "Billing",
      icon: Layers2,
      path: "/#",
    },
    {
      name: "Profile",
      icon: Layers2,
      path: "/#",
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((option) => (
                <SidebarMenu key={option.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={option.path}
                      className={`p-4 ${
                        path.includes(option.path) ? "bg-purple-200" : ""
                      }`}
                    >
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
