"use client";

import ManagementLayout from "@/components/layout/ManagementLayout";
import Table from "@/components/ui/Table";
import instance from "@/lib/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/student");
  const [searchText, setSearchText] = useState("");
  const head = ["code", "name", "gender", "age", "phone"];
  const [showModalId, setShowModalId] = useState(0);
  const [searchData, setSearchData] = useState<any>(null);

  const handleDelete = async (id: number) => {
    try {
      const { data } = await instance.delete(`/student/${id}`);
      if (data.status) {
        mutate();
        toast.success("Xoá sinh viên thành công");
      } else toast.error(data?.message || "any error");
    } catch (error: any) {
      console.error(error);
      toast.error("Lỗi: ", error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) return setSearchData(null);

    const filtered = data?.content.filter(
      (item: any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.code.toLowerCase().includes(searchText.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filtered.length === 0) {
      toast.error("Không tìm thấy sinh viên");
    }
    setSearchData({ content: filtered });
  };

  return (
    <ManagementLayout
      setShowModalId={setShowModalId}
      showModalId={showModalId}
      text="Quản lý sinh viên"
      href="/dashboard/student/new"
      error={error}
      isLoading={isLoading}
      modelText="Bạn có chắc chắn xoá sinh viên này?"
      onDelete={handleDelete}
      searchText={searchText}
      setSearchText={setSearchText}
      onSearch={handleSearch}
    >
      {data?.content?.length === 0 ? (
        <p className="px-4 text-red-600">Không có sinh viên nào</p>
      ) : (
        <Table
          head={head}
          data={searchData || data}
          setShowModalId={setShowModalId}
          href={"student"}
        />
      )}
    </ManagementLayout>
  );
};

export default Page;
