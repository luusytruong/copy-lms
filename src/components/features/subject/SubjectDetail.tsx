"use client";

import Loading from "@/components/common/Loading";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../Header";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import SubjectForm from "./SubjectForm";
import { useRouter } from "next/navigation";

const SubjectDetail = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useSWR(`/api/subject/${id}`);
  const [subject, setSubject] = useState(data || {});
  const router = useRouter();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject) return;
    try {
      const { data } = await instance.put(`/subject/${id}`, subject);
      if (data.status === true) {
        toast.success("Cập nhật môn học thành công");
        router.push("/dashboard/subject");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    if (data) setSubject(data);
  }, [data]);

  return (
    <>
      <Loading isShow={isLoading} />
      <Header text="Chi tiết môn học" />
      <SubjectForm
        error={error}
        subject={subject}
        setSubject={setSubject}
        onSave={handleSave}
      />
    </>
  );
};

export default SubjectDetail;
