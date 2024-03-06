import { formatDate, formatToIDR } from "@/utils";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    const res = await fetch("https://duamitra.vercel.app/api/history");
    const response = await res.json();
    setHistories(response.data);
    // console.log(response.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="flex h-screen w-fit flex-col items-center bg-black pt-7 text-white lg:w-full">
      <Link href="https://duamitra.vercel.app/">
        <button className="bg-gray-500 px-4 py-2 text-white">Kembali</button>
      </Link>
      <table className="my-5 h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-400 rtl:text-right">
        <thead className="text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Waktu
            </th>
            <th scope="col" className="px-6 py-3">
              Admin
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Barang
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Satuan
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Total Harga
            </th>
            <th scope="col" className="px-6 py-3">
              Modal
            </th>
            <th scope="col" className="px-6 py-3">
              Untung
            </th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && histories.length === 0 && (
            <tr>
              <td colSpan={8} className="p-4 text-center font-semibold">
                Tidak ada history transaksi
              </td>
            </tr>
          )}
          {histories.map(
            ({ product, type, price, qty, user, createdAt }: any) => (
              <tr className="bg-gray-800" key={createdAt}>
                <td className="px-6 py-4">{formatDate(createdAt)}</td>
                <td className="px-6 py-4">{user.username}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">
                  {type === "sell" ? formatToIDR(price) : "-"}
                </td>
                <td className={`px-6 py-4 `}>{qty}</td>
                <td className={`px-6 py-4 `}>
                  {type === "sell" ? formatToIDR(price * qty) : "-"}
                </td>
                <td className="px-6 py-4">
                  {formatToIDR(product.capitalPrice * qty)}
                </td>
                <td className="px-6 py-4">
                  {type === "sell"
                    ? formatToIDR((price - product.capitalPrice) * qty)
                    : "-"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
