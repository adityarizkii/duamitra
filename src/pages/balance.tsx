import { formatToIDR } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BalancePage = () => {
  const [profitBalance, setProfitBalance] = useState<number>(0);
  const [capitalBalance, setCapitalBalance] = useState<number>(0);

  const fetchBalance = async () => {
    const balanceRes = await fetch("http://localhost:3000/api/balance");
    const balanceResponse = await balanceRes.json();

    setProfitBalance(balanceResponse.data[0].profitBalance);
    setCapitalBalance(balanceResponse.data[0].capitalBalance);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <Link href={"/"}>
        <button className="bg-gray-500 px-4 py-1 text-white hover:bg-gray-700">
          Kembali
        </button>
      </Link>
      <h1 className="my-6 text-xl font-medium">Saldo</h1>
      <p>Saldo Modal : {formatToIDR(capitalBalance)}</p>
      <p>Saldo Keuntungan : {formatToIDR(profitBalance)}</p>
    </div>
  );
};

export default BalancePage;
