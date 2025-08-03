import { cn } from "@/utils/utils";
import { InputHTMLAttributes, ComponentType } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  icon?: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  className?: string;
  classInputName?: string;
  classIconName?: string;
  size?: number;
  strokeWidth?: number;
}

const Input = ({
  text,
  icon: Icon,
  type = "text",
  name,
  value,
  required,
  onChange,
  className,
  classInputName,
  classIconName,
  size = 20,
  strokeWidth = 1.6,
  ...props
}: InputProps) => {
  return (
    <div className={cn("flex flex-col gap-2 items-stretch", className)}>
      {text && (
        <label htmlFor={name} className="text-sm font-medium">
          {text}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={size}
            strokeWidth={strokeWidth}
            className={cn(
              "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2",
              classIconName
            )}
          />
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          required={required}
          onChange={onChange}
          className={cn(
            "border border-gray-200 rounded-md p-2.5 w-full",
            Icon ? "pl-10" : "pl-3",
            classInputName
          )}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
