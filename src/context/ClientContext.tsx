"use client";

import { SideBarProvider } from "./SidebarContext";
import { UserProvider } from "./UserContext";

export const ClientContext = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <UserProvider>
      <SideBarProvider>{children}</SideBarProvider>
    </UserProvider>
  );
};

export default ClientContext;
