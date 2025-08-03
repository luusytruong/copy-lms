import { cn } from "@/utils/utils";
import { ComponentType, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

const Button = ({
  text,
  icon: Icon,
  className,
  onClick,
  size = 20,
  strokeWidth = 1.6,
  iconClassName,
  textClassName,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn("flex items-center gap-2", className)}
      onClick={onClick}
      {...props}
    >
      {props.children}
      {Icon && (
        <Icon
          className={cn("", iconClassName)}
          size={size}
          strokeWidth={strokeWidth}
        />
      )}
      {text && <span className={cn("", textClassName)}>{text}</span>}
    </button>
  );
};

export default Button;
