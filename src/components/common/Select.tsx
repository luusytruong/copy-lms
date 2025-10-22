"use client";

import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  data: Array<object>;
  name: string;
  value: string;
  label: string;
}

const Select = ({ data, name, value, onChange, label }: SelectProps) => {
  return (
    <div className="flex flex-col gap-2 items-stretch">
      <span className="font-medium">
        {label}
        <span className="text-red-600">*</span>
      </span>
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="p-2.5 border border-gray-200 rounded-md w-full"
      >
        {data?.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item?.name || item?.subjectName || item?.className}
          </option>
        ))}
        <option value="">----</option>
      </select>
    </div>
  );
};

export default Select;
