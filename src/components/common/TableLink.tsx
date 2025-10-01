import React, { ComponentType, LinkHTMLAttributes, ReactNode } from "react";
import LinkNProgress from "./LinkNProgress";
import { cn } from "@/utils/utils";

interface TableLinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
  href?: string;
  text?: string;
  icon?: ComponentType<{
    className?: string;
    size?: number;
    strokeWidth?: number;
  }>;
  iconClassName?: string;
  textClassName?: string;
  size?: number;
  strokeWidth?: number;
}

const TableLink = ({
  href,
  text,
  icon: Icon,
  className,
  onClick,
  size = 20,
  strokeWidth = 1.6,
  iconClassName,
  textClassName,
  ...props
}: TableLinkProps) => {
  return (
    <LinkNProgress
      href={href || "#"}
      className={cn(
        "flex items-center gap-2 active:scale-95 transition-all duration-100",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn("", iconClassName)}
          size={size}
          strokeWidth={strokeWidth}
        />
      )}
      {text && <span className={cn("", textClassName)}>{text}</span>}
    </LinkNProgress>
  );
};

export default TableLink;
