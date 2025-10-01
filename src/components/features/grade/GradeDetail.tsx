"use client";

import Loading from "@/components/common/Loading";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../Header";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import GradeForm from "./GradeForm";
import { useRouter } from "next/navigation";

const GradeDetail = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useSWR(`/api/grade/${id}`);
  const [grade, setGrade] = useState(data || {});
  const router = useRouter();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!grade) return;
    try {
      const { data } = await instance.put(`/grade/${id}`, grade);
      if (data.status === true) {
        toast.success("Cập nhật điểm thành công");
        router.push("/dashboard/grade");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    if (data) setGrade(data);
  }, [data]);

  return (
    <>
      <Loading isShow={isLoading} />
      <Header text="Chi tiết điểm" />
      <GradeForm
        error={error}
        grade={grade}
        setGrade={setGrade}
        onSave={handleSave}
      />
    </>
  );
};

export default GradeDetail;
