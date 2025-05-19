'use client';

import { IndexData } from "@/lib/stock";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";

export default function YBS() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [updateTime, setUpdateTime] = useState<string>("");
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const fetchData = async () => {
      setUpdateTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      try {
        const response = await axios.get("/yuanbaotree/index/real");
        setIndices(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData();
        intervalId = setInterval(fetchData, 60000);
      } else {
        clearInterval(intervalId);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 60000);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [])

  if (indices.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <div className="flex p-2">
        {indices.map((index) => (
          <div key={index.symbol} className="flex-1">
            <div className="text-sm font-semibold text-center">
              {index.name}
            </div>
            <div
              className={`text-lg font-bold text-center ${
                index.percent >= 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {index.current.toFixed(2)}
            </div>
            <div
              className={`flex items-center justify-center gap-3 text-sm ${
                index.chg >= 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              <div>{index.chg.toFixed(2)}</div>
              <div>
                {index.percent >= 0 ? "+" : ""}
                {index.percent}%
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="p-2">
        <div className="text-gray-500 text-sm">当前时间: {updateTime}</div>
      </div>
    </div>
  );
}