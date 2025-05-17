import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";

const WorkspaceProvider = ({ children }) => {
  return;
  <SidebarProvider>
    <AppSidebar />
    <SidebarTrigger />
    {children}
  </SidebarProvider>;
};

export default WorkspaceProvider;
