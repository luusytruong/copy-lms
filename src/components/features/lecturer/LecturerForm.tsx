"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
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
      <div className="h-full overflow-auto">
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
          <div className="flex flex-col gap-2 items-stretch md:col-span-2">
            <span className="font-medium">Môn học</span>
            <div className="p-2.5 min-h-10 border border-gray-200 rounded-md w-full flex flex-wrap gap-2">
              {teacher.subjects?.length > 0 ? (
                teacher.subjects?.map((sub: string) => (
                  <p key={sub} className="p-2 bg-[#f3f5f7] rounded-lg">
                    {sub}
                  </p>
                ))
              ) : (
                <p className="p-2 bg-[#f3f5f7] rounded-lg">Chưa có môn học</p>
              )}
            </div>
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

export default LecturerForm;
