"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const offlineToastId = useRef(null);

  useEffect(() => {
    const handleOnline = () => {
      if (offlineToastId.current) {
        toast.dismiss(offlineToastId.current);
        offlineToastId.current = null;
      }
      toast.success("Đã khôi phục kết nối");
    };

    const handleOffline = () => {
      const id = toast.error("Mất kết nối mạng", { duration: Infinity });
      offlineToastId.current = id;
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{}}>{children}</NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
