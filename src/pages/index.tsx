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
  capitalPrice: number;
  price: number;
  stock: number;
  capitalStock: number;
  image?: string;
};

const productDefaultValue = {
  id: "",
  name: "",
  capitalPrice: 0,
  price: 0,
  stock: 0,
  capitalStock: 0,
  image: "",
};

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isOnSell, setIsOnSell] = useState<boolean>(false);
  const [isOnAdd, setIsOnAdd] = useState<boolean>(false);
  const [productOnEdit, setProductOnEdit] =
    useState<ProductType>(productDefaultValue);
  const [editAmount, setEditAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sellProducts = async () => {
    setIsLoading(true);
    const productsRes = await fetch(
      "http://localhost:3000/api/products/" + productOnEdit.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          stock: productOnEdit.stock - editAmount,
        }),
      }
    );

    // handle error
    if (productsRes.status !== 200) return console.log(productsRes);

    // update stock on state without fetching
    const newProducts = products.map((product: any) => {
      if (product.id === productOnEdit.id) {
        return {
          ...product,
          stock: product.stock - editAmount,
        };
      }
      return product;
    });
    setProducts(newProducts);

    // update history
    const historyRes = await fetch("http://localhost:3000/api/history", {
      method: "POST",
      body: JSON.stringify({
        qty: editAmount,
        price: productOnEdit.price, //custom price
        productId: productOnEdit.id,
        userId: "clt6c57m500008u4w0019dedd",
        type: "sell",
      }),
    });
    const historyResponse = await historyRes.json();
    console.log(historyResponse);

    // update balance
    const balanceRes = await fetch("http://localhost:3000/api/balance", {
      method: "PATCH",
      body: JSON.stringify({
        capitalBalance: productOnEdit.capitalPrice * editAmount,
        profitBalance:
          (productOnEdit.price - productOnEdit.capitalPrice) * editAmount,
        type: "sell",
      }),
    });
    const balanceResponse = await balanceRes.json();
    console.log(balanceResponse);

    // close modal
    setIsOnSell(false);
    setIsOnAdd(false);
    setProductOnEdit(productDefaultValue);
    setEditAmount(1);

    setIsLoading(false);
  };

  const addProducts = async () => {
    setIsLoading(true);
    const res = await fetch(
      "http://localhost:3000/api/products/" + productOnEdit.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: productOnEdit.name,
          price: productOnEdit.price,
          stock: productOnEdit.stock + editAmount,
        }),
      }
    );

    // handle error
    if (res.status !== 200) return console.log(res);

    // update stock in product without fetching
    const newProducts = products.map((product: any) => {
      if (product.id === productOnEdit.id) {
        return {
          ...product,
          stock: product.stock + editAmount,
        };
      }
      return product;
    });
    setProducts(newProducts);

    // update history
    const historyRes = await fetch("http://localhost:3000/api/history", {
      method: "POST",
      body: JSON.stringify({
        qty: editAmount,
        price: productOnEdit.price, //custom price
        productId: productOnEdit.id,
        userId: "clt6c57m500008u4w0019dedd",
        type: "buy",
      }),
    });
    const historyResponse = await historyRes.json();
    console.log(historyResponse);

    // update balance
    const balanceRes = await fetch("http://localhost:3000/api/balance", {
      method: "PATCH",
      body: JSON.stringify({
        capitalBalance: productOnEdit.capitalPrice * editAmount,
        profitBalance:
          (productOnEdit.price - productOnEdit.capitalPrice) * editAmount,
        type: "buy",
      }),
    });
    const balanceResponse = await balanceRes.json();
    console.log(balanceResponse);

    // close modal
    setIsOnAdd(false);
    setIsOnAdd(false);
    setProductOnEdit(productDefaultValue);
    setEditAmount(1);

    setIsLoading(false);
  };

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
      className={`relative flex min-h-screen ${isOnSell || isOnAdd ? "overflow-hidden" : ""} flex-col items-center bg-black`}
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
          setIsOnSell={setIsOnSell}
          sellProducts={sellProducts}
          isLoading={isLoading}
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
          setIsOnSell={setIsOnSell}
          addProducts={addProducts}
          isLoading={isLoading}
        />
      )}
      {/* end edit modal */}
      <table className="mb-5 mt-10 h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nama Barang
            </th>
            <th scope="col" className="px-6 py-3">
              Stok Awal
            </th>
            <th scope="col" className="px-6 py-3">
              Stok Tersisa
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Beli
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Jual
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Total Barang
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
              <td className="px-6 py-4">{product.capitalStock}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{formatToIDR(product.capitalPrice)}</td>
              <td className="px-6 py-4">{formatToIDR(product.price)}</td>
              <td className="px-6 py-4">
                {formatToIDR(product.price * product.stock)}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4">
                  <button
                    className="bg-green-500 px-2 py-1 text-white hover:bg-green-700"
                    onClick={() => {
                      setIsOnSell(true);
                      setProductOnEdit(product);
                    }}
                  >
                    Barang Laku
                  </button>
                  <button
                    className="bg-blue-500 px-2 py-1 text-white hover:bg-blue-700"
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
      <div className="flex gap-6">
        <Link href="http://localhost:3000/history">
          <button className="bg-gray-500 px-4 py-1 text-white hover:bg-gray-700">
            Histori Transaksi
          </button>
        </Link>
        <Link href="http://localhost:3000/balance">
          <button className="bg-gray-500 px-4 py-1 text-white hover:bg-gray-700">
            Saldo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
