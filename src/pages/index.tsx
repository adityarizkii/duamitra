import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import SoldModal from "@/components/fragments/SoldModal";
import { formatToIDR } from "@/utils";
import AddModal from "@/components/fragments/AddModal";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type ProductType = {
  id: string;
  name: string;
  capitalPrice: number;
  price: number;
  stock: number;
  capitalStock: number;
  image?: string;
};

type UserType = {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
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
  const { data }: any = useSession();
  const [user, setUser] = useState<UserType>(); //data user {}

  useEffect(() => {
    // console.log(data);
    if (data && data.user) {
      const username = data.user.username;

      // fetch all user
      const users = fetchUsers();
      users.then((usersArray: []) => {
        const filteredUser = usersArray.find(
          (user: any) => user.username === username
        );
        // console.log(filteredUser);

        setUser(filteredUser);
      });
    }
  }, [data]);

  const fetchUsers = async () => {
    const res = await fetch("https://duamitra.vercel.app/api/users");
    const response = await res.json();
    return response.data;
  };

  const sellProducts = async () => {
    setIsLoading(true);
    const productsRes = await fetch(
      "https://duamitra.vercel.app/api/products/" + productOnEdit.id,
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
    const historyRes = await fetch("https://duamitra.vercel.app/api/history", {
      method: "POST",
      body: JSON.stringify({
        qty: editAmount,
        price: productOnEdit.price, //custom price
        productId: productOnEdit.id,
        userId: user?.id,
        type: "sell",
      }),
    });
    const historyResponse = await historyRes.json();
    console.log(historyResponse);

    // update balance
    const balanceRes = await fetch("https://duamitra.vercel.app/api/balance", {
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
      "https://duamitra.vercel.app/api/products/" + productOnEdit.id,
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
    const historyRes = await fetch("https://duamitra.vercel.app/api/history", {
      method: "POST",
      body: JSON.stringify({
        qty: editAmount,
        price: productOnEdit.price, //custom price
        productId: productOnEdit.id,
        userId: user?.id,
        type: "buy",
      }),
    });
    const historyResponse = await historyRes.json();
    console.log(historyResponse);

    // update balance
    const balanceRes = await fetch("https://duamitra.vercel.app/api/balance", {
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
    const res = await fetch("https://duamitra.vercel.app/api/products");
    const response = await res.json();

    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={`relative flex min-h-screen w-fit lg:w-full ${isOnSell || isOnAdd ? "max-h-screen overflow-hidden" : ""} flex-col items-center overflow-x-scroll bg-black px-4`}
    >
      <div className="flex w-full justify-between px-40 py-6">
        <div className="flex gap-6">
          <Link href="https://duamitra.vercel.app/history">
            <button className="bg-gray-500 px-4 py-1 text-white hover:bg-gray-700">
              Histori Transaksi
            </button>
          </Link>
          <Link href="https://duamitra.vercel.app/balance">
            <button className="bg-gray-500 px-4 py-1 text-white hover:bg-gray-700">
              Saldo
            </button>
          </Link>
        </div>
        {user && (
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-semibold text-white">
              {user.username}
            </h1>
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-red-500 px-4 py-1 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
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
      <table className="my-4 h-fit rounded-xl border border-gray-400 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
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
    </div>
  );
};

export default Home;
