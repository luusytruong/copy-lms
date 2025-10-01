"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { ListFilter, Power, Settings, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/utils";
import { useSidebar } from "@/context/SidebarContext";
import SidebarItem from "../common/SidebarItem";
import icons from "@/utils/icons.json";
import { useUser } from "@/context/UserContext";

const Sidebar = ({}) => {
  const { user, handleLogout } = useUser();
  const { isOpen, setIsOpen } = useSidebar();
  const [ishow, setIshow] = useState(false);
  const initialized = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const collapseItems = [
    { name: "Tài khoản", icon: User, onClick: undefined },
    { name: "Cài đặt", icon: Settings, onClick: undefined },
    { name: "Đăng xuất", icon: Power, onClick: handleLogout },
  ];
  const data = [
    {
      nav: [
        {
          text: "Bảng xếp hạng LMS",
          icon: "custom-status-up",
          href: "/dashboard",
        },
      ],
    },
    {
      label: "Học tập",
      nav: [
        {
          text: "Quản lý sinh viên",
          href: "/dashboard/student",
          icon: "custom-element-plus",
        },
        {
          text: "Quản lý giảng viên",
          href: "/dashboard/lecturer",
          icon: "custom-element-plus",
        },
        {
          text: "Quản lý môn học",
          href: "/dashboard/subject",
          icon: "custom-element-plus",
        },
        {
          text: "Quản lý điểm số",
          href: "/dashboard/grade",
          icon: "custom-element-plus",
        },
      ],
    },
    {
      label: "Hệ thống",
      nav: [
        {
          text: "Nhật ký hệ thống",
          href: "/dashboard/logs",
          icon: "custom-layer",
        },
        {
          text: "Cài đặt",
          href: "/dashboard/settings",
          icon: "custom-setting-2",
        },
        {
          text: "Hồ sơ của bạn",
          href: "/dashboard/profile",
          icon: "custom-user-square",
        },
        {
          text: "Đăng xuất",
          icon: "right-from-bracket",
          onClick: handleLogout,
        },
      ],
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={"sidebar-overlay"}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={initialized.current ? { opacity: 0 } : undefined}
          transition={{ duration: 0.32, ease: "easeInOut" }}
          className="fixed md:hidden inset-0 bg-[#00000099] z-40"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      )}
      {isOpen && (
        <motion.div
          key={"sidebar"}
          exit={{ marginLeft: -280 }}
          animate={{ marginLeft: 0 }}
          initial={initialized.current ? { marginLeft: -280 } : undefined}
          transition={{ duration: 0.32, ease: "easeInOut" }}
          className="fixed inset-y-0 z-50 md:relative h-svh min-w-[280px] bg-[#f8f9fa] border-r border-gray-300 border-dashed flex flex-col items-stretch"
        >
          <div className="flex items-center gap-2.5 h-[90px] px-6">
            <div className="p-2.5 bg-white rounded-xl">
              <Image
                src={"/app.png"}
                width={96}
                height={73}
                alt="app"
                className="object-contain !w-[48px] !h-auto"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[12px] h-[24px] font-extrabold text-[#0081ff] bg-[#0081ff11] w-fit px-2.5 rounded-full flex items-center">
                V1.0.00
              </p>
              <p className="text-[12px] font-bold text-[#212529bf]">
                truongdev.site
              </p>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            <div className="mx-4 mb-4 flex">
              <div className="bg-[#f3f5f7] p-5 border border-gray-200 rounded-xl w-full flex flex-col">
                <div className="max-w-full flex">
                  <Image
                    src={"/avatar.png"}
                    width={"40"}
                    height={"40"}
                    alt="app"
                    priority
                    style={{ height: "auto", width: "auto" }}
                    className="object-contain rounded-full !w-[45px] !h-[45px] mr-4"
                  />
                  <div className="flex flex-col flex-1 gap-0.5 justify-center max-w-[120px]">
                    <p className="text-sm font-bold whitespace-nowrap text-ellipsis line-clamp-1">
                      {isMounted
                        ? user?.username || "Loading..."
                        : "Loading..."}
                    </p>
                    <p className="text-[13px] text-[#777777] uppercase font-bold">
                      {isMounted
                        ? user?.username
                          ? "Admin"
                          : "Loading..."
                        : "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center justify-end ml-1">
                    <Button
                      icon={ListFilter}
                      onClick={() => setIshow((prev) => !prev)}
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {ishow && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.32 }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col mt-5">
                        {collapseItems.map((item, index) => (
                          <li key={index}>
                            <Button
                              icon={item.icon}
                              text={item.name}
                              className={cn(
                                "hover:text-[#0081ff] gap-3 text-gray-500",
                                index !== 0 ? "mt-3" : ""
                              )}
                              textClassName="text-sm !select-none"
                              size={17}
                              strokeWidth={2}
                              onClick={item.onClick}
                            />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="pb-3 pt-1">
              {data?.map((item, index) => (
                <div key={index}>
                  {item?.label && (
                    <p className="text-sm font-extrabold text-gray-600 uppercase mt-2 px-5 pt-4 pb-2">
                      {item.label}
                    </p>
                  )}
                  {item?.nav && (
                    <ul className="flex flex-col mt-2 gap-2">
                      {item.nav.map((item, index) => (
                        <SidebarItem key={index} {...item} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {/* {icons.map((item, index) => (
                <SidebarItem key={index} text={item} icon={item} />
              ))} */}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
