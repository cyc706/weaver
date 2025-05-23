import { create } from "zustand";
import { FEStock } from '@/types/fe';
import { apiGetStockList } from '@/app/ybs/api';

export interface State {
  loading: boolean;
  tabs: {
    name: string;
    key: string;
  }[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  stockList: FEStock[];
  init: () => void;
}


export const useYbsStore = create<State>((set) => ({
  loading: true,
  tabs: [
    {
      name: "全部",
      key: "all"
    },
    {
      name: "A股",
      key: "CN"
    },
    {
      name: "港股",
      key: "HK"
    },
    {
      name: "美股",
      key: "US"
    }
  ],

  currentTab: "all",
  setCurrentTab: (tab: string) => {
    if (!tab) {
      return;
    }

    set({ currentTab: tab })
  },
  stockList: [],
  init: async () => {
    const res = await apiGetStockList();
    set({ stockList: res, loading: false });
  }
}))