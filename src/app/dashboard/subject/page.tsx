"use client";

import ManagementLayout from "@/components/layout/ManagementLayout";
import Table from "@/components/ui/Table";
import instance from "@/lib/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/subject");
  const [searchText, setSearchText] = useState("");
  const head = ["credit", "subjectName", "teacherName"];
  const [showModalId, setShowModalId] = useState(0);
  const [searchData, setSearchData] = useState<any>(null);

  const handleDelete = async (id: number) => {
    try {
      const { data } = await instance.delete(`/subject/${id}`);
      if (data.status) {
        mutate();
        toast.success("Xoá môn học thành công");
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
        item.subjectName.toLowerCase().includes(searchTerm) ||
        item.teacherName.toLowerCase().includes(searchTerm) ||
        String(item.credit).toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      toast.error("Không tìm thấy môn học");
    }
    setSearchData({ content: filtered });
  };

  return (
    <ManagementLayout
      setShowModalId={setShowModalId}
      showModalId={showModalId}
      text="Quản lý môn học"
      href="/dashboard/subject/new"
      error={error}
      isLoading={isLoading}
      modelText="Bạn có chắc chắn xoá môn học này?"
      onDelete={handleDelete}
      searchText={searchText}
      setSearchText={setSearchText}
      onSearch={handleSearch}
    >
      {data?.content?.length === 0 ? (
        <p className="px-4 text-red-600">Không có môn học nào</p>
      ) : (
        <Table
          head={head}
          data={searchData || data}
          setShowModalId={setShowModalId}
          href={"subject"}
        />
      )}
    </ManagementLayout>
  );
};

export default Page;
