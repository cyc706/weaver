"use client";
import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  salary: number;
  time: number;
  setSalary: (salary: number) => void;
  setTime: (time: number) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      salary: 10000,
      time: 2,
      setSalary: (salary) => set({ salary }),
      setTime: (time) => set({ time }),
    }),
    {
      name: "salary-time-store", // 存储在 localStorage 中的键名
    }
  )
);

export default function FormPage() {
  const { salary, time, setSalary, setTime } = useStore();
  const total = useMemo(() => {
    const nSlary = salary > 39530.25 ? 39530.25 : salary;
    const moeny = nSlary * time;
    return {
      nGift: moeny.toLocaleString('en-US'),
      n1Gift: (moeny + salary).toLocaleString('en-US'),
    };
  }, [salary, time]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">大礼包金额计算器</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              工资
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              入职年限（不满半年要N = 0.5计算）
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </form>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">总金额</h3>
          <p className="mt-1 text-xl text-gray-700">N的赔偿{total.nGift}</p>
          <p className="mt-1 text-xl text-gray-700">N+1的赔偿{total.n1Gift}</p>
        </div>
      </div>
    </div>
  );
}
