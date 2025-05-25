"use client";
import { create } from "zustand";
import { FEStock } from "@/types/fe";
import { apiGetStockList } from "@/app/ybs/api";

const localKey = "ybs_stock_list";

let localSymbolList: string[] = [];
if (typeof localStorage !== "undefined") {
  // 这里可以安全地使用 localStorage
  localSymbolList = localStorage.getItem(localKey) ? JSON.parse(localStorage.getItem(localKey) || '[]') : [];
}

export interface State {
  localSymbolList: string[];
  loading: boolean;
  tabs: {
    name: string;
    key: string;
  }[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  stockList: FEStock[];
  init: () => void;
  addStock: (symbol: string) => void;
  removeStock: (symbol: string) => void;
}

export const useYbsStore = create<State>((set, get) => ({
  localSymbolList,
  loading: true,
  tabs: [
    {
      name: "全部",
      key: "all",
    },
    {
      name: "A股",
      key: "CN",
    },
    {
      name: "港股",
      key: "HK",
    },
    {
      name: "美股",
      key: "US",
    },
  ],

  currentTab: "all",
  setCurrentTab: (tab: string) => {
    if (!tab) {
      return;
    }

    set({ currentTab: tab });
  },
  stockList: [],
  init: async () => {
    const { localSymbolList } = get();
    const res = await apiGetStockList(localSymbolList.join(","));
    set({ stockList: res, loading: false });
  },

  addStock: (symbol: string) => {
    const { localSymbolList, init } = get();
    if (localSymbolList.includes(symbol)) {
      return;
    }
    localSymbolList.push(symbol);
    localStorage.setItem(localKey, JSON.stringify(localSymbolList));
    set({ localSymbolList });

    init();
  },

  removeStock: (symbol: string) => {
    const { localSymbolList, init } = get();
    const newSymbolList = localSymbolList.filter((s) => s !== symbol);
    localStorage.setItem(localKey, JSON.stringify(newSymbolList));
    set({ localSymbolList: newSymbolList });
    init();
  },
}));
