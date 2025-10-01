import React, { ReactNode, useState } from "react";
import Loading from "../common/Loading";
import Header from "../features/Header";
import Input from "../common/Input";
import Button from "../common/Button";
import { Plus, Search } from "lucide-react";
import Modal from "../ui/Modal";
import TableLink from "../common/TableLink";

const ManagementLayout = ({
  text,
  error,
  href,
  isLoading,
  modelText,
  onDelete,
  setShowModalId,
  showModalId,
  searchText,
  setSearchText,
  onSearch,
  children,
}: {
  error: any;
  text: string;
  href: string;
  modelText: string;
  isLoading: boolean;
  setShowModalId: React.Dispatch<React.SetStateAction<number>>;
  showModalId: number;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete: (id: number) => void;
  children: ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col">
      <Loading isShow={isLoading} />
      <Header text={text} />
      <Modal isShow={!!showModalId} close={() => setShowModalId(0)}>
        <h1 className="font-semibold">{modelText}</h1>
        <div className="flex gap-4 justify-end mt-4">
          <Button
            text="Huỷ"
            className="bg-gray-100 px-4.5 py-1.5 rounded-full hover:bg-[#0081ff] hover:text-white"
            autoFocus
            onClick={() => setShowModalId(0)}
          />
          <Button
            text="Xoá"
            className="bg-gray-100 px-4.5 py-1.5 rounded-full hover:bg-red-600 hover:text-white"
            onClick={() => onDelete(showModalId)}
          />
        </div>
      </Modal>
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mx-4 mt-4">
          {error?.message || "Lỗi không xác định"}
        </div>
      )}
      <div className="flex p-4 pb-0 gap-4 justify-end md:justify-between">
        <TableLink
          href={href || "#"}
          icon={Plus}
          text="Thêm mới"
          textClassName="hidden md:inline-block"
          className="fixed bottom-4 right-4 md:bottom-0 md:right-0 w-10 md:w-auto aspect-square md:aspect-auto justify-center md:relative bg-[#f3f5f7] rounded-full md:rounded-lg md:px-4 hover:bg-[#0081ff] hover:text-white"
        />
        <form
          action="#"
          onSubmit={onSearch}
          className="flex gap-4 md:w-auto w-full"
        >
          <Input
            placeholder="Nhập từ khoá"
            className="lg:w-[280px] w-full"
            classInputName="!p-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            icon={Search}
            text="Tìm kiếm"
            type="submit"
            className="bg-[#f3f5f7] text-nowrap px-4 justify-center rounded-lg hover:bg-[#0081ff] hover:text-white"
          />
        </form>
      </div>
      <div className="flex flex-col h-full w-full overflow-auto">
        <div className="w-full py-4">{children}</div>
      </div>
    </div>
  );
};

export default ManagementLayout;
