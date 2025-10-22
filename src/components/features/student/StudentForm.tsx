"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Table from "@/components/ui/Table";
import { Save } from "lucide-react";
import React, { ChangeEvent } from "react";
import useSWR from "swr";

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
  const { data: classes, isLoading: isLoadingClasses } =
    useSWR("/api/classroom");
  const { data: grades, isLoading: isLoadingGrades } = useSWR(
    "/api/grade/student/" + student?.id
  );
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
      <div className="h-full overflow-auto mt-4">
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
            name="yearofbirth"
            type="date"
            value={student?.yearofbirth || ""}
            required
            text="Ngày sinh"
            onChange={handleChange}
          />
          <Select
            data={classes?.content || []}
            name="classRoomId"
            value={student?.classRoomId || student?.classRoom?.id}
            label="Lớp học"
            onChange={handleSelectChange}
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
          <div className="flex justify-end items-end">
            <Button
              icon={Save}
              text="Lưu"
              type="submit"
              className="p-2.5 bg-[#0081ff] text-white rounded-lg"
            />
          </div>
          <div className="col-span-2 -mx-4">
            <Table
              head={["subjectName", "score"]}
              data={grades?.data || []}
              setShowModalId={undefined}
              href={"grade"}
              showBtnDelete={false}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentForm;
