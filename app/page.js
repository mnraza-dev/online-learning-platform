import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => {
  return <div className="text-3xl">Home
  
  <UserButton/> </div>;
};

export default Home;
