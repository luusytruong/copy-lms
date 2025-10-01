import Sidebar from "@/components/ui/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </>
  );
};

export default Layout;
