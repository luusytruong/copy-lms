"use client";

import { SWRConfig } from "swr";
import { SideBarProvider } from "./SidebarContext";
import { UserProvider } from "./UserContext";
import { NetworkProvider } from "./NetworkContext";
import fetcher from "@/lib/fetcher";

export const ClientContext = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <NetworkProvider>
      <SWRConfig
        value={{
          fetcher,
          // refreshInterval: 10000,
          // revalidateOnReconnect: true,
          // revalidateOnFocus: true,
        }}
      >
        <UserProvider>
          <SideBarProvider>{children}</SideBarProvider>
        </UserProvider>
      </SWRConfig>
    </NetworkProvider>
  );
};

export default ClientContext;
