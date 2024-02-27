import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import SoldModal from "@/components/fragments/SoldModal";
import { formatToIDR } from "@/utils";
import AddModal from "@/components/fragments/AddModal";
import Link from "next/link";

type ProductType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
};

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isOnSell, setIsOnSell] = useState<boolean>(false);
  const [isOnAdd, setIsOnAdd] = useState<boolean>(false);
  const [productOnEdit, setProductOnEdit] = useState<ProductType>();
  const [editAmount, setEditAmount] = useState<number>(1);

  // useEffect(() => {
  //   console.log(editAmount);
  // }, [editAmount]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const response = await res.json();
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={`relative flex ${isOnSell || isOnAdd ? "max-h-screen overflow-hidden" : "min-h-screen"} flex-col items-center bg-black`}
    >
      {/* edit modal */}
      {isOnSell && productOnEdit && (
        <SoldModal
          products={products}
          setProducts={setProducts}
          productOnEdit={productOnEdit}
          editAmount={editAmount}
          setEditAmount={setEditAmount}
          setProductOnEdit={setProductOnEdit}
          setIsOnAdd={setIsOnAdd}
          setIsOnEdit={setIsOnSell}
        />
      )}
      {isOnAdd && productOnEdit && (
        <AddModal
          products={products}
          setProducts={setProducts}
          productOnEdit={productOnEdit}
          editAmount={editAmount}
          setEditAmount={setEditAmount}
          setProductOnEdit={setProductOnEdit}
          setIsOnAdd={setIsOnAdd}
          setIsOnEdit={setIsOnSell}
        />
      )}
      {/* end edit modal */}
      <Link href="http://localhost:3000/history">
        <button className="bg-blue-500 px-4 py-1 text-white">
          Histori Transaksi
        </button>
      </Link>
      <table className="my-10 h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nama Barang
            </th>
            <th scope="col" className="px-6 py-3">
              Harga
            </th>
            <th scope="col" className="px-6 py-3">
              Stok
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Total
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr className="bg-white dark:bg-gray-800" key={product.id}>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">{formatToIDR(product.price)}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">
                {formatToIDR(product.price * product.stock)}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4">
                  <button
                    className="bg-green-500 px-2 py-1 text-white"
                    onClick={() => {
                      setIsOnSell(true);
                      setProductOnEdit(product);
                    }}
                  >
                    Barang Laku
                  </button>
                  <button
                    className="bg-blue-500 px-2 py-1 text-white"
                    onClick={() => {
                      setIsOnAdd(true);
                      setProductOnEdit(product);
                    }}
                  >
                    Barang Masuk
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
