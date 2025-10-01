"use client";

import Loading from "@/components/common/Loading";
import React, { useState } from "react";
import Header from "../Header";
import SubjectForm from "./SubjectForm";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";

const SubjectNew = () => {
  const [subject, setSubject] = useState({});
  const router = useRouter();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) return;
    try {
      const { data } = await instance.post(`/subject`, subject);
      if (data.status === true) {
        toast.success("Thêm mới môn học thành công");
        router.push("/dashboard/subject");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  return (
    <>
      <Loading isShow={false} />
      <Header text="Thêm mới môn học" />
      <SubjectForm
        subject={subject}
        setSubject={setSubject}
        onSave={handleSave}
      />
    </>
  );
};

export default SubjectNew;
