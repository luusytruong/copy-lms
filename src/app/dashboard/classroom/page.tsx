"use client";

import ManagementLayout from "@/components/layout/ManagementLayout";
import Table from "@/components/ui/Table";
import instance from "@/lib/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/classroom");
  const [searchText, setSearchText] = useState("");
  const head = ["year", "className", "department"];
  const [showModalId, setShowModalId] = useState(0);
  const [searchData, setSearchData] = useState<any>(null);

  const handleDelete = async (id: number) => {
    try {
      const { data } = await instance.delete(`/classroom/${id}`);
      if (data.status) {
        mutate();
        toast.success("Xoá lớp học thành công");
      } else toast.error(data?.message || "any error");
    } catch (error: any) {
      console.error(error);
      toast.error("Lỗi: ", error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) return setSearchData(null);

    const searchTerm = searchText.toLowerCase();
    const filtered = data?.content.filter(
      (item: any) =>
        item.className.toLowerCase().includes(searchTerm) ||
        item.department.toLowerCase().includes(searchTerm) ||
        String(item.year).toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      toast.error("Không tìm thấy lớp học");
    }
    setSearchData({ content: filtered });
  };

  return (
    <ManagementLayout
      setShowModalId={setShowModalId}
      showModalId={showModalId}
      text="Quản lý lớp học"
      href="/dashboard/classroom/new"
      error={error}
      isLoading={isLoading}
      modelText="Bạn có chắc chắn xoá lớp học này?"
      onDelete={handleDelete}
      searchText={searchText}
      setSearchText={setSearchText}
      onSearch={handleSearch}
    >
      {data?.content?.length === 0 ? (
        <p className="px-4 text-red-600">Không có lớp học nào</p>
      ) : (
        <Table
          head={head}
          data={searchData?.content || data?.content}
          setShowModalId={setShowModalId}
          href={"classroom"}
        />
      )}
    </ManagementLayout>
  );
};

export default Page;
