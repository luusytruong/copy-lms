"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/Loading";

interface User {
  username: string;
  password: string;
}

interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  handleLogout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : { username: "", password: "" };
    }
    return { username: "", password: "" };
  });

  const handleLogout = () => {
    setUser({
      username: "",
      password: "",
    });
    router.replace("/");
  };

  useEffect(() => {
    if (!user.username) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
