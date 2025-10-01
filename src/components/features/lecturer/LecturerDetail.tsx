"use client";

import Loading from "@/components/common/Loading";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../Header";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import LecturerForm from "./LecturerForm";
import { useRouter } from "next/navigation";

const LecturerDetail = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useSWR(`/api/teacher/${id}`);
  const [teacher, setTeacher] = useState(data || {});
  const router = useRouter();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!teacher) return;
    try {
      const { data } = await instance.put(`/teacher/${id}`, teacher);
      if (data.status === true) {
        toast.success("Cập nhật giảng viên thành công");
        router.push("/dashboard/lecturer");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    if (data) setTeacher(data);
  }, [data]);

  return (
    <>
      <Loading isShow={isLoading} />
      <Header text="Chi tiết giảng viên" />
      <LecturerForm
        error={error}
        teacher={teacher}
        setTeacher={setTeacher}
        onSave={handleSave}
      />
    </>
  );
};

export default LecturerDetail;
