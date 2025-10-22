import React from "react";
import Button from "../common/Button";
import { Info, Trash } from "lucide-react";
import TableLink from "../common/TableLink";
import dayjs from "dayjs";

const Table = ({
  head,
  href,
  data,
  setShowModalId,
  showBtnDelete = true,
}: {
  href: string;
  head: string[];
  data: any;
  showBtnDelete?: boolean;
  setShowModalId?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <table className="table-auto w-full border-collapse text-[15px]">
      <thead>
        <tr className="border-b border-gray-100">
          {head.map((h) => (
            <th key={h} className="text-start py-2.5 px-4">
              {h.charAt(0).toUpperCase() + h.slice(1)}
            </th>
          ))}
          <th className="py-2.5 px-4 text-start"></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) &&
          data?.map((item: any) => (
            <tr
              key={item?.id}
              className="group hover:bg-[#f8f9fa] border-b border-gray-100"
            >
              {head.map((h) => (
                <td key={h} className="py-2.5 px-4 text-nowrap">
                  {h === "yearofbirth"
                    ? dayjs(item?.[h]).format("DD/MM/YYYY")
                    : typeof item[h] === "object"
                    ? item[h]?.name
                    : item[h]}
                </td>
              ))}
              <td className="py-2.5 px-4">
                <div className="flex gap-2 justify-end">
                  <TableLink
                    href={`/dashboard/${href}/${item.id}`}
                    icon={Info}
                    className="bg-[#f8f9fa] group-hover:bg-[#EEEFF0] hover:bg-blue-400 hover:text-white p-2.5 rounded-lg"
                  />
                  {showBtnDelete && (
                    <Button
                      icon={Trash}
                      onClick={() => setShowModalId?.(item.id)}
                      className="bg-[#f8f9fa] group-hover:bg-[#EEEFF0] hover:bg-red-500 hover:text-white p-2.5 rounded-lg"
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
