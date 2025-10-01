"use client";

import Button from "@/components/common/Button";
import Header from "@/components/features/Header";
import { RefreshCw } from "lucide-react";
import React from "react";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/logs/tail");
  return (
    <>
      <Header text="Nhật ký hệ thống" />
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mx-4 mt-4">
          {error?.message || "Lỗi không xác định"}
        </div>
      )}
      <div className="p-4 flex justify-end">
        <Button
          text="Làm mới"
          icon={RefreshCw}
          onClick={mutate}
          className="bg-[#f3f5f7] text-nowrap px-4 justify-center rounded-lg hover:bg-[#0081ff] hover:text-white h-10"
        />
      </div>
      <div className="h-full overflow-auto p-4">
        <div className="h-fit bg-gray-100 p-4 rounded-md font-['Courier New', Courier, monospace] text-sm whitespace-pre-wrap">
          {Array.isArray(data) &&
            data?.map((line: string, index: number) => (
              <p key={index} className="">
                {line}
              </p>
            ))}
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default Page;
