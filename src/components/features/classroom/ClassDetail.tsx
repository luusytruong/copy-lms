"use client";

import Loading from "@/components/common/Loading";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../Header";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import ClassForm from "./ClassForm";
import { useRouter } from "next/navigation";

const ClassDetail = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useSWR(`/api/classroom/${id}`);
  const [clss, setClass] = useState(
    data ? { ...data, teacherId: data.teacher?.id } : { teacherId: null }
  );
  const router = useRouter();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!clss) return;
    try {
      const { data } = await instance.put(`/classroom/${id}`, clss);
      if (data.status === true) {
        toast.success("Cập nhật lớp thành công");
        router.push("/dashboard/classroom");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    if (data)
      setClass(
        data ? { ...data, teacherId: data.teacher?.id } : { teacherId: null }
      );
  }, [data]);

  return (
    <>
      <Loading isShow={isLoading} />
      <Header text="Chi tiết lớp" />
      <ClassForm
        error={error}
        clss={clss}
        setClass={setClass}
        onSave={handleSave}
      />
    </>
  );
};

export default ClassDetail;
