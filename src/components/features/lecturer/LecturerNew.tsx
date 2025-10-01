"use client";

import Loading from "@/components/common/Loading";
import React, { useState } from "react";
import Header from "../Header";
import LecturerForm from "./LecturerForm";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";

const LecturerNew = () => {
  const [teacher, setTeacher] = useState({});
  const router = useRouter();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher) return;
    try {
      const { data } = await instance.post(`/teacher`, teacher);
      if (data.status === true) {
        toast.success("Thêm mới giảng viên thành công");
        router.push("/dashboard/lecturer");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  return (
    <>
      <Loading isShow={false} />
      <Header text="Thêm mới giảng viên" />
      <LecturerForm
        teacher={teacher}
        setTeacher={setTeacher}
        onSave={handleSave}
      />
    </>
  );
};

export default LecturerNew;
