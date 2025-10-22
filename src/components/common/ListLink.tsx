"use client";

import React from "react";
import LinkNProgress from "./LinkNProgress";

const ListLink = ({
  data,
  baseUrl,
  label,
}: {
  data: Array<object>;
  baseUrl: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-2 items-stretch md:col-span-2">
      <span className="font-medium">{label}</span>
      <div className="p-2.5 min-h-10 border border-gray-200 rounded-md w-full flex flex-wrap gap-2">
        {data?.length > 0 ? (
          data?.map((item: any) => (
            <LinkNProgress
              key={item?.id}
              href={`${baseUrl}/${item?.id}`}
              className="p-2 bg-[#f3f5f7] hover:bg-gray-200/70 rounded-lg"
            >
              {item?.subjectName || item?.className || item?.name}
            </LinkNProgress>
          ))
        ) : (
          <p className="p-2 bg-[#f3f5f7] rounded-lg">Chưa có dữ liệu</p>
        )}
      </div>
    </div>
  );
};

export default ListLink;
