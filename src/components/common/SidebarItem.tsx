"use client";

import { cn } from "@/utils/utils";
import Button from "./Button";
import LinkNProgress from "./LinkNProgress";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  text?: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
}
const SidebarItem = ({ text, icon, href, onClick }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === (href || "");
  return (
    <li
      className={cn(
        "mx-3 hover:bg-[#EDEFF1] rounded-xl text-sm text-[#5b6b79] h-[46px]",
        active ? "text-[#0081ff] bg-[#0081ff11]" : ""
      )}
    >
      {href ? (
        <LinkNProgress
          href={href || "#"}
          className="flex items-center gap-2.5 px-5 py-3.5"
        >
          <span className="-mt-1">
            <svg className="w-5.5 h-5.5">
              <use href={`/custom.svg#${icon || "custom-lock-outline"}`} />
            </svg>
          </span>
          <span className="whitespace-nowrap line-clamp-1 text-ellipsis">
            {text}
          </span>
        </LinkNProgress>
      ) : (
        <Button onClick={onClick} className="px-5 py-3.5 gap-2.5 w-full">
          <span className="-mt-1">
            <svg className="w-5.5 h-5.5">
              <use href={`/custom.svg#${icon || "custom-lock-outline"}`} />
            </svg>
          </span>
          <span className="whitespace-nowrap line-clamp-1 text-ellipsis">
            {text}
          </span>
        </Button>
      )}
    </li>
  );
};

export default SidebarItem;
