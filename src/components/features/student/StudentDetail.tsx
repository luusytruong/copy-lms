"use client";

import Loading from "@/components/common/Loading";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../Header";
import toast from "react-hot-toast";
import instance from "@/lib/axios";
import StudentForm from "./StudentForm";
import { useRouter } from "next/navigation";

const StudentDetail = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useSWR(`/api/student/${id}`);
  const [student, setStudent] = useState(data || {});
  const router = useRouter();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!student) return;
    try {
      const { data } = await instance.put(`/student/${id}`, student);
      if (data.status === true) {
        toast.success("Cập nhật sinh viên thành công");
        router.push("/dashboard/student");
      } else toast.error(data?.message || data?.messages[0] || "any error");
    } catch (error: any) {
      toast.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    if (data) setStudent(data);
  }, [data]);

  return (
    <>
      <Loading isShow={isLoading} />
      <Header text="Chi tiết sinh viên" />
      <StudentForm
        error={error}
        student={student}
        setStudent={setStudent}
        onSave={handleSave}
      />
    </>
  );
};

export default StudentDetail;
