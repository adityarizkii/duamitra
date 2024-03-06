import { formatToIDR } from "@/utils";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

const productDefaultValue = {
  id: "",
  name: "",
  capitalPrice: 0,
  price: 0,
  stock: 0,
  capitalStock: 0,
  image: "",
};

const SoldModal = ({
  productOnEdit,
  editAmount,
  setEditAmount,
  setProductOnEdit,
  setIsOnSell,
  sellProducts,
  isLoading,
}: any) => {
  const closeModal = () => {
    setIsOnSell(false);
    setProductOnEdit(productDefaultValue);
    setEditAmount(1);
  };

  return (
    <div className="absolute left-0 right-0 flex h-screen flex-col items-center justify-center bg-gray-500 bg-opacity-80">
      <div className="bg-gray-800 p-10">
        <table className="h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-400 rtl:text-right">
          <thead className="bg-gray-800 text-xs uppercase text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Barang
              </th>
              <th scope="col" className="px-6 py-3">
                Stok
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="flex justify-between px-6 py-3">
                <span>Jumlah Terjual</span>
                <button onClick={closeModal}>
                  <IoClose className="h-5 w-5 text-white hover:text-gray-400" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-white"
              >
                {productOnEdit.name}
              </th>
              <td className="px-6 py-4">{productOnEdit.stock}</td>
              <td className="px-6 py-4">
                <p>{formatToIDR(productOnEdit.price)}</p>
                <input
                  type="number"
                  className="mt-2 border bg-gray-800 px-2 py-1"
                  value={productOnEdit.price}
                  onChange={(e) => {
                    if (!isNaN(parseInt(e.target.value))) {
                      setProductOnEdit({
                        ...productOnEdit,
                        price: parseInt(e.target.value),
                      });
                    }
                  }}
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4">
                  <button
                    className="border border-white px-2 py-1 text-white disabled:bg-gray-400"
                    disabled={editAmount <= 1}
                    onClick={() => setEditAmount(editAmount - 1)}
                  >
                    <FaMinus />
                  </button>
                  <div className="w-12 border border-white bg-transparent text-center text-white">
                    {editAmount}
                  </div>
                  <button
                    className="border border-white px-2 py-1 text-white disabled:bg-gray-400"
                    disabled={editAmount >= productOnEdit.stock}
                    onClick={() => setEditAmount(editAmount + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5 flex flex-row-reverse gap-4">
          <button
            className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={sellProducts}
            disabled={isLoading}
          >
            {isLoading ? <CgSpinner className="animate-spin" /> : "Jual"}
          </button>
          <button
            className="bg-red-500 px-4 py-2 text-white hover:bg-red-700"
            onClick={closeModal}
            disabled={isLoading}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoldModal;
