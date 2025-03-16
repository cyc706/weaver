"use client";
import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  money: number;
  RMB: number;
  MHB: number;
  setMoney: (money: number) => void;
  setRMB: (RMB: number) => void;
  setMHB: (MHB: number) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      money: 200,
      RMB: 1,
      MHB: 1,
      setMoney: (money) => set({ money }),
      setRMB: (RMB) => set({ RMB }),
      setMHB: (MHB) => set({ MHB }),
    }),
    {
      name: "xyq-money-store", // 存储在 localStorage 中的键名
    }
  )
);

export default function FormPage() {
  const { money, RMB, MHB, setMoney, setRMB, setMHB } = useStore();

  const rate = useMemo(() => {
    if (money === 0) return 1;
    return 3000 / money;
  }, [money]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">梦幻物价计算机</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              3000W菜价
            </label>
            <input
              type="number"
              value={money}
              onChange={(e) => setMoney(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">当前3000W梦幻币的价格</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              RMB
            </label>
            <input
              type="number"
              value={RMB}
              onChange={(e) => setRMB(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">对应梦幻币数量: {RMB * rate} W</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              MHB
            </label>
            <input
              type="number"
              value={MHB}
              onChange={(e) => setMHB(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">对应人民币数量: {MHB / rate} 元</p>
          </div>
        </form>
      </div>
    </div>
  );
}
