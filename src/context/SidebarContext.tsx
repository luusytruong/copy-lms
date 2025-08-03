"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SideBarProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
};
