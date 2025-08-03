"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  major: string;
  course: string;
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
  const initialized = useRef(false);
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    major: "",
    course: "",
  });

  const handleLogout = () => {
    setUser({
      id: "",
      name: "",
      major: "",
      course: "",
    });
    router.replace("/");
  };

  useEffect(() => {
    try {
      const userCookie = getCookie("user");
      if (userCookie?.id) {
        setUser(userCookie);
      } else {
        throw new Error("Invalid user");
      }
    } catch {
      deleteCookie("user");
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    if (user?.id) {
      setCookie("user", user);
    } else {
      deleteCookie("user");
    }
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
