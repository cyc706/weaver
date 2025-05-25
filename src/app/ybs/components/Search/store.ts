import { create } from "zustand";
import { debounce } from "@/utils";
import { FESearchStock } from "@/types/fe";
import { apiSearchStock } from '@/app/ybs/api';

interface State {
  show: boolean;
  setShow: (show: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  onSearch: (input: string) => void;
  list: FESearchStock[];
}

const useSearchStore = create<State>((set, get) => ({
  show: false,
  setShow: (show: boolean) => {
    set({ show })
    if (!show) {
      set({ input: "", list: [] })
    }
  },
  input: "",
  setInput: (input: string) => {
    set({ input })
    const { onSearch } = get();
    onSearch(input);
  },
  onSearch: debounce(async (input: string) => {
    if (!input) {
      set({ list: [] });
      return;
    }
    const list = await apiSearchStock(input);
    set({ list })
  }, 500),
  list: [],
}));

export { useSearchStore };
