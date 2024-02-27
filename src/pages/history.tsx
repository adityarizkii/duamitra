import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:3000/api/history");
    const response = await res.json();
    setHistories(response.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="flex min-h-screen justify-center bg-black pt-10 text-white">
      <table className="h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nama Barang
            </th>
            <th scope="col" className="px-6 py-3">
              Detail
            </th>
            <th scope="col" className="px-6 py-3">
              Jumlah Transaksi
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Pengubah
            </th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history: any) => {
            return (
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {history.itemName}
                </th>
                <td className="px-6 py-4">{history.details}</td>
                <td
                  className={`px-6 py-4 font-medium ${history.transactionAmount < 0 ? "text-red-500" : "text-green-500"}`}
                >
                  {history.transactionAmount}
                </td>
                <td className="px-6 py-4">{history.updater}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
