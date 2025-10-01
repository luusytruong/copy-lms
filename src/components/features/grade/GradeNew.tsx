"use client";

import Loading from "@/components/common/Loading";
import React, { useState } from "react";
import Header from "../Header";
import GradeForm from "./GradeForm";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";

const GradeNew = () => {
  const [grade, setGrade] = useState({});
  const router = useRouter();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade) return;
    try {
      const { data } = await instance.post(`/grade`, grade);
      if (data.status === true) {
        toast.success("Thêm mới điểm thành công");
        router.push("/dashboard/grade");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  return (
    <>
      <Loading isShow={false} />
      <Header text="Thêm mới điểm" />
      <GradeForm grade={grade} setGrade={setGrade} onSave={handleSave} />
    </>
  );
};

export default GradeNew;
