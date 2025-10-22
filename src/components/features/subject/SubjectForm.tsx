"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";
import { Save } from "lucide-react";
import React, { ChangeEvent } from "react";
import useSWR from "swr";

const SubjectForm = ({
  subject,
  error,
  setSubject,
  onSave,
}: {
  error?: any;
  subject: any;
  setSubject: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
}) => {
  const { data, isLoading } = useSWR(`/api/teacher`);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubject((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubject((prev: any) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Loading isShow={isLoading} />
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
            name="credit"
            type="number"
            value={subject?.credit || ""}
            required
            text="Số tín chỉ"
            onChange={handleChange}
          />
          <Input
            name="subjectName"
            type="text"
            value={subject?.subjectName || ""}
            required
            text="Tên môn học"
            onChange={handleChange}
          />
          <Select
            data={data?.content}
            name="teacherId"
            value={subject?.teacherId || subject?.teacher?.id}
            onChange={handleSelectChange}
            label="Giáo viên"
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

export default SubjectForm;
