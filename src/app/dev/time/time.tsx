"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import dayjs from "dayjs";
import { useMemo } from "react";

interface Store {
  input: number;
  base64: string;
  setInput: (input: number) => void;
  setBase64: (base64: string) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      input: 0,
      base64: "",
      setInput: (input) => set({ input }),
      setBase64: (base64) => set({ base64 }),
    }),
    {
      name: "timeStamp-store", // 存储在 localStorage 中的键名
    }
  )
);

// Utility function for Base64 conversion
// function base64Encode(input: string): string {
//   return btoa(input);
// }

function base64Decode(base64: string): string {
  try {
    return atob(base64);
  } catch (error) {
    console.log(error);
    return "Invalid Base64 string";
  }
}

export default function Time() {
  const { input, setInput, base64, setBase64 } = useStore();
  const time = useMemo(() => {
    const timestamp = input.toString().length === 10 ? input * 1000 : input; // Convert seconds to milliseconds if needed
    const format = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
    return format;
  }, [input]);


  const base64Decoded = useMemo(() => base64Decode(base64), [base64]); 
  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side: Textarea */}
      <div style={{ flex: 1, padding: "10px", gap: "10px", display: "flex", flexDirection: "column" }}>
        <textarea
          placeholder="输入时间戳"
          style={{ width: "100%", height: "50%" }} // Changed height to 50%
          value={input}
          onChange={(e) => setInput(parseInt(e.target.value) || 0)}
        />
        <textarea
          placeholder="输入base64"
          style={{ width: "100%", height: "50%" }} // Changed height to 50%
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
        />
      </div>
      {/* Right side: Output */}
      <div style={{ flex: 1, padding: "10px", gap: "10px", display: "flex", flexDirection: "column" }}>
        <div style={{ height: "50%", backgroundColor: "#f0f0f0" }}>{time}</div>
        <div style={{ height: "50%", backgroundColor: "#f0f0f0",}}>{base64Decoded}</div>
      </div>
    </div>
  );
}
