"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./index.module.css";

// 扩展IndexData接口以适应自选股列表需求
interface StockItem {
  name: string;
  symbol: string;
  status_id: number; // 5交易中 8休市
  status?: string; // 交易状态tag
  region?: string; // 地区
  percent: number; // 涨跌幅
  current: number; // 当前价
  chg: number; // 涨跌额
  timestamp?: number; // 时间戳
  lastClose?: number; // 上一个交易日收盘价
  logo?: string; // 标识，如US、HK等
}

// 模拟数据，实际使用时可以替换为API数据
const mockStocks: StockItem[] = [
  {
    name: "阿里巴巴",
    symbol: "BABA",
    status_id: 5,
    region: "US",
    percent: -0.36,
    current: 123.46,
    chg: -0.44,
    lastClose: 122.00,
    logo: "US"
  },
  {
    name: "上证指数",
    symbol: "000001",
    status_id: 5,
    percent: -0.40,
    current: 3367.46,
    chg: -13.36
  },
  {
    name: "东方财富",
    symbol: "300059",
    status_id: 5,
    percent: -1.33,
    current: 21.53,
    chg: -0.29
  },
  {
    name: "贵州茅台",
    symbol: "600519",
    status_id: 5,
    percent: -1.10,
    current: 1614.13,
    chg: -17.88
  },
  {
    name: "腾讯控股",
    symbol: "00700",
    status_id: 5,
    region: "HK",
    percent: -1.45,
    current: 508.00,
    chg: -7.50,
    logo: "HK"
  },
  {
    name: "科创绿指ETF东财",
    symbol: "589060",
    status_id: 5,
    percent: 0.10,
    current: 0.973,
    chg: 0.001
  }
];

// 格式化数字为带符号的字符串
const formatWithSign = (num: number): string => {
  const fixed = Math.abs(num) < 1 ? 3 : 2;
  return num > 0 ? `+${num.toFixed(fixed)}` : `${num.toFixed(fixed)}`;
};

// 格式化百分比
const formatPercent = (percent: number): string => {
  return percent > 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`;
};

export default function List() {
  const [stocks, setStocks] = useState<StockItem[]>(mockStocks);
  const [updateTime, setUpdateTime] = useState<string>("");

  // 实际项目中，这里应该从API获取数据
  // 这里使用模拟数据，但保留了API调用的结构
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    const fetchData = async () => {
      setUpdateTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      try {
        // 实际项目中应该替换为真实API调用
        // const response = await axios.get("/api/stocks/favorite");
        // setStocks(response.data.data);
        
        // 这里使用模拟数据
        setStocks(mockStocks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchData();
        intervalId = setInterval(fetchData, 60000); // 每分钟更新一次
      } else {
        clearInterval(intervalId);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 60000);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      <div className={styles.container}>
        {stocks.map((stock) => (
          <div key={stock.symbol} className={styles.stockItem}>
            <div className={styles.leftSection}>
              {stock.logo && (
                <div className={styles.logoContainer}>
                  <span className={`${styles.logo} ${stock.logo === "HK" ? styles.logoHK : stock.logo === "US" ? styles.logoUS : ""}`}>
                    {stock.logo}
                  </span>
                </div>
              )}
              <div className={styles.nameSection}>
                <div className={styles.stockName}>{stock.name}</div>
                <div className={styles.stockCode}>{stock.symbol}</div>
              </div>
            </div>
            
            <div className={styles.rightSection}>
              <div className={styles.priceSection}>
                <div className={`${styles.price} ${stock.percent >= 0 ? styles.up : styles.down}`}>
                  {stock.current.toFixed(stock.current < 100 ? 3 : 2)}
                </div>
                {stock.lastClose && (
                  <div className={styles.lastClose}>
                    {stock.lastClose.toFixed(2)} 最后
                  </div>
                )}
              </div>
              
              <div className={styles.changeSection}>
                <div className={`${styles.changePercent} ${stock.percent >= 0 ? styles.up : styles.down}`}>
                  {formatPercent(stock.percent)}
                </div>
                <div className={`${styles.change} ${stock.percent >= 0 ? styles.up : styles.down}`}>
                  {formatWithSign(stock.chg)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.updateTime}>
        更新时间: {updateTime}
      </div>
    </div>
  );
}