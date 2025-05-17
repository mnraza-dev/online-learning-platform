import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const AppHeader = () => {
  return (
    <div className="p-4 shadow-sm flex items-center justify-between">
      <SidebarTrigger />
      <h1>Header</h1>
      <UserButton />
    </div>
  );
};

export default AppHeader;
