"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";
import { Save } from "lucide-react";
import React, { ChangeEvent } from "react";
import useSWR from "swr";

const GradeForm = ({
  grade,
  error,
  setGrade,
  onSave,
}: {
  error?: any;
  grade: any;
  setGrade: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
}) => {
  const { data: subjects, isLoading: isLoadingSubject } =
    useSWR(`/api/subject`);
  const { data: students, isLoading: isLoadingStudent } =
    useSWR(`/api/student`);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGrade((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGrade((prev: any) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Loading isShow={isLoadingStudent || isLoadingStudent} />
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mx-4 mt-4">
          {error?.message || "Lỗi không xác định"}
        </div>
      )}
      <div className="h-full overflow-auto mt-4">
        <form
          action="#"
          className="grid gap-4 md:grid-cols-2 p-4"
          onSubmit={onSave}
        >
          <Input
            name="score"
            type="number"
            value={grade?.score || ""}
            required
            text="Số điểm"
            onChange={handleChange}
          />
          <Select
            data={students?.content}
            name="studentId"
            value={grade?.studentId || grade?.student?.id}
            onChange={handleSelectChange}
            label="Sinh viên"
          />
          <Select
            data={subjects?.content}
            name="subjectId"
            value={grade?.subjectId || grade?.subject?.id}
            onChange={handleSelectChange}
            label="Môn học"
          />
          <div className="flex justify-end items-end">
            <Button
              icon={Save}
              text="Lưu"
              type="submit"
              className="p-2.5 bg-[#0081ff] text-white rounded-lg"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default GradeForm;
