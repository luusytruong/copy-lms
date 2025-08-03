"use client";

import { AlignLeft } from "lucide-react";
import Button from "../common/Button";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";

const Dashboard = () => {
  const { setIsOpen } = useSidebar();

  return (
    <div className="flex flex-col flex-1">
      <div className="h-16 px-3 flex items-center gap-6 bg-[#f8f9fa]">
        <Button
          icon={AlignLeft}
          size={24}
          strokeWidth={2}
          className="bg-[#EEEFF0] h-[45px] aspect-square justify-center rounded-lg"
          iconClassName="text-gray-500"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <p className="text-lg font-extrabold uppercase">
          Kiến trúc và thiết kế phần mềm
        </p>
      </div>
      <div className="flex flex-col items-stretch">
        <div className="relative">
          <Image
            src="/banner.png"
            width={1640}
            height={250}
            alt="banner"
            priority
            className="object-contain !w-screen !h-auto"
          />
        </div>
        <p>Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;
