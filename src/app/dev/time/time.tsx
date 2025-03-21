"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import dayjs from "dayjs";
import { useMemo } from "react";

interface Store {
  input: number;
  setInput: (input: number) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      input: 0,
      setInput: (input) => set({ input }),
    }),
    {
      name: "timeStamp-store", // 存储在 localStorage 中的键名
    }
  )
);

export default function Time() {
  const { input, setInput } = useStore();
  const time = useMemo(() => {
    const timestamp = input.toString().length === 10 ? input * 1000 : input; // Convert seconds to milliseconds if needed
    const format = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
    return format;
  }, [input]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side: Textarea */}
      <div style={{ flex: 1, padding: "10px" }}>
        <textarea
          placeholder="输入时间戳"
          style={{ width: "100%", height: "100%" }}
          value={input}
          onChange={(e) => setInput(parseInt(e.target.value) || 0)}
        />
      </div>
      {/* Right side: Output */}
      <div style={{ flex: 1, padding: "10px", backgroundColor: "#f0f0f0" }}>
        <div>{time}</div>
      </div>
    </div>
  );
}
