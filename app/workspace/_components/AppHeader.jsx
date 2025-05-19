import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const AppHeader = () => {
  return (
    <header className="p-4 sticky top-0 left-0 z-60 backdrop-blur-md shadow-sm flex items-center justify-between">
      <SidebarTrigger />
      <UserButton />
    </header>
  );
};

export default AppHeader;
