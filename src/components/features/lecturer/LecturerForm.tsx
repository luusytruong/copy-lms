"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LinkNProgress from "@/components/common/LinkNProgress";
import ListLink from "@/components/common/ListLink";
import { Save } from "lucide-react";
import React, { ChangeEvent } from "react";

const LecturerForm = ({
  teacher,
  error,
  setTeacher,
  onSave,
}: {
  error?: any;
  teacher: any;
  setTeacher: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacher((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeacher((prev: any) => ({ ...prev, [name]: value }));
  };
  return (
    <>
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
            name="department"
            type="text"
            value={teacher?.department || ""}
            required
            text="Ngành dạy"
            onChange={handleChange}
          />
          <Input
            name="name"
            type="text"
            value={teacher?.name || ""}
            required
            text="Tên giảng viên"
            onChange={handleChange}
          />
          <Input
            name="email"
            type="text"
            value={teacher?.email || ""}
            required
            text="Email"
            onChange={handleChange}
          />
          <Input
            name="phone"
            type="number"
            value={teacher?.phone || ""}
            required
            text="Số điện thoại"
            onChange={handleChange}
          />
          <ListLink
            label="Môn học"
            data={teacher?.subjects || []}
            baseUrl="/dashboard/subject"
          />
          <ListLink
            label="Lớp học"
            data={teacher?.classroom || []}
            baseUrl="/dashboard/classroom"
          />
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

export default LecturerForm;
