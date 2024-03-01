import { formatDate, formatToIDR } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:3000/api/history");
    const response = await res.json();
    setHistories(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-black pt-7 text-white">
      <Link href="http://localhost:3000/">
        <button className="mb-5 bg-gray-500 px-4 py-1 text-white">
          Kembali
        </button>
      </Link>
      <table className="h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
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
          {histories.map((history: any) => (
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4">{formatDate(history.createdAt)}</td>
              <td className="px-6 py-4">{history.user.username}</td>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {history.product.name}
              </th>
              <td className="px-6 py-4">{formatToIDR(history.price)}</td>
              <td className={`px-6 py-4 `}>{history.qty}</td>
              <td className={`px-6 py-4 `}>
                {formatToIDR(history.price * history.qty)}
              </td>
              <td className="px-6 py-4">
                {formatToIDR(history.product.capitalPrice * history.qty)}
              </td>
              <td className="px-6 py-4">
                {formatToIDR(
                  (history.price - history.product.capitalPrice) * history.qty
                )}
              </td>
            </tr>
          ))}
          {/* <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Berlin
            </th>
            <td className="px-6 py-4">Rp 250.000,00</td>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">admin</td>
            <td className="px-6 py-4">Rp 200.000,00</td>
            <td className={`px-6 py-4`}>Rp 50.000,00</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
