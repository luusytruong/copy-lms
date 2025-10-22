"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ListLink from "@/components/common/ListLink";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";
import Table from "@/components/ui/Table";
import { Save } from "lucide-react";
import React, { ChangeEvent } from "react";
import useSWR from "swr";

const ClassForm = ({
  clss,
  error,
  setClass,
  onSave,
}: {
  error?: any;
  clss: any;
  setClass: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
}) => {
  const { data: subjects, isLoading: isLoadingClass } =
    useSWR(`/api/classroom`);
  const { data: lecturer, isLoading: isLoadingLecturer } =
    useSWR(`/api/teacher`);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClass((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClass((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Loading isShow={isLoadingClass} />
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
            name="year"
            type="number"
            value={clss?.year || ""}
            required
            text="Năm học"
            onChange={handleChange}
          />
          <Input
            name="className"
            type="text"
            value={clss?.className || ""}
            required
            text="Tên lớp học"
            onChange={handleChange}
          />
          <Input
            name="department"
            type="text"
            value={clss?.department || ""}
            required
            text="Khoa"
            onChange={handleChange}
          />
          <Select
            data={lecturer?.content || []}
            name="teacherId"
            value={clss?.teacherId || clss?.teacher?.id}
            required
            label="GVCN"
            onChange={handleSelectChange}
          />
          {/* <ListLink
            data={clss.students || []}
            baseUrl="/dashboard/student"
            label="Sinh viên"
          /> */}
          <div className="flex justify-end items-end md:col-span-2">
            <Button
              icon={Save}
              text="Lưu"
              type="submit"
              className="p-2.5 bg-[#0081ff] text-white rounded-lg"
            />
          </div>
          <div className="col-span-2 -mx-4">
            <Table
              head={["code", "name"]}
              data={clss.students || []}
              setShowModalId={undefined}
              href={"student"}
              showBtnDelete={false}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ClassForm;
