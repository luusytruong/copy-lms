"use client";

import Loading from "@/components/common/Loading";
import React, { useState } from "react";
import Header from "../Header";
import ClassForm from "./ClassForm";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";

const ClassNew = () => {
  const [clss, setClass] = useState({});
  const router = useRouter();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clss) return;
    try {
      const { data } = await instance.post(`/clss`, clss);
      if (data.status === true) {
        toast.success("Thêm mới điểm thành công");
        router.push("/dashboard/clss");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  return (
    <>
      <Loading isShow={false} />
      <Header text="Thêm mới điểm" />
      <ClassForm clss={clss} setClass={setClass} onSave={handleSave} />
    </>
  );
};

export default ClassNew;
