"use client";

import Loading from "@/components/common/Loading";
import React, { useState } from "react";
import Header from "../Header";
import StudentForm from "./StudentForm";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";

const StudentNew = () => {
  const [student, setStudent] = useState({ gender: "Khác" });
  const router = useRouter();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    try {
      const { data } = await instance.post(`/student`, student);
      if (data.status === true) {
        toast.success("Thêm mới sinh viên thành công");
        router.push("/dashboard/student");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  return (
    <>
      <Loading isShow={false} />
      <Header text="Thêm mới sinh viên" />
      <StudentForm
        student={student}
        setStudent={setStudent}
        onSave={handleSave}
      />
    </>
  );
};

export default StudentNew;
