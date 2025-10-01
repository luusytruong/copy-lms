"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Save } from "lucide-react";
import React, { ChangeEvent } from "react";

const StudentForm = ({
  student,
  error,
  setStudent,
  onSave,
}: {
  error?: any;
  student: any;
  setStudent: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudent((prev: any) => ({ ...prev, [name]: value }));
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
            name="code"
            type="text"
            value={student?.code || ""}
            required
            text="Mã sinh viên"
            onChange={handleChange}
          />
          <Input
            name="name"
            type="text"
            value={student?.name || ""}
            required
            text="Tên sinh viên"
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2 items-stretch">
            <span className="font-medium">Giới tính</span>
            <select
              name="gender"
              value={student?.gender || ""}
              onChange={handleSelectChange}
              className="p-2.5 border border-gray-200 rounded-md w-full"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <Input
            name="age"
            type="number"
            value={student?.age || ""}
            required
            text="Tuổi"
            onChange={handleChange}
          />
          <Input
            name="email"
            type="text"
            value={student?.email || ""}
            required
            text="Email"
            onChange={handleChange}
          />
          <Input
            name="phone"
            type="number"
            value={student?.phone || ""}
            required
            text="Số điện thoại"
            onChange={handleChange}
          />
          <Input
            name="major"
            type="text"
            value={student?.major || ""}
            required
            text="Ngành học"
            onChange={handleChange}
          />
          <Input
            name="gpa"
            type="number"
            value={student?.gpa || ""}
            required
            text="GPA"
            onChange={handleChange}
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

export default StudentForm;
