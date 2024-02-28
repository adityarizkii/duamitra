import { formatToIDR } from "@/utils";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const productDefaultValue = {
  id: "",
  name: "",
  price: 0,
  stock: 0,
  image: "",
};

const AddModal = ({
  products,
  setProducts,
  productOnEdit,
  editAmount,
  setEditAmount,
  setProductOnEdit,
  setIsOnAdd,
  addProducts,
}: any) => {
  const closeModal = () => {
    setIsOnAdd(false);
    setProductOnEdit(productDefaultValue);
    setEditAmount(1);
  };

  return (
    <div className="absolute left-0 right-0 flex h-screen flex-col items-center justify-center bg-gray-500 bg-opacity-80">
      <div className="bg-gray-800 p-10">
        <table className="h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-800 text-xs uppercase text-gray-900 dark:text-gray-400">
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
                <span>Jumlah Masuk</span>
                <button onClick={closeModal}>
                  <IoClose className="h-5 w-5 text-white" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {productOnEdit.name}
              </th>
              <td className="px-6 py-4">{productOnEdit.stock}</td>
              <td className="px-6 py-4">{formatToIDR(productOnEdit.price)}</td>
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
            className="bg-blue-500 px-4 py-2 text-white"
            onClick={addProducts}
          >
            Tambah
          </button>
          <button
            className="bg-red-500 px-4 py-2 text-white"
            onClick={closeModal}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
