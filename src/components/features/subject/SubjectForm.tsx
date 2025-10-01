"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
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
      <div className="h-full overflow-auto">
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
          <div className="flex flex-col gap-2 items-stretch">
            <span className="font-medium">Giáo viên</span>
            <select
              name="teacherId"
              value={subject?.teacherId || ""}
              onChange={handleSelectChange}
              className="p-2.5 border border-gray-200 rounded-md w-full"
            >
              {data?.content?.map((teacher: any) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
              <option value="">----</option>
            </select>
          </div>
          <div className="flex justify-end items-end md:col-span-2">
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
