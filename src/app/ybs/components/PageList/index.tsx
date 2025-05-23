/* eslint-disable @next/next/no-img-element */
import { useMemo } from "react";
import { useYbsStore } from "@/app/ybs/store";
import RateNum from "@/app/ybs/components/RateNum";
import styles from "./index.module.css";

export default function PageList() {
  const tabs = useYbsStore((s) => s.tabs);
  const currentTab = useYbsStore((s) => s.currentTab);
  const setCurrentTab = useYbsStore((s) => s.setCurrentTab);
  const stockList = useYbsStore((s) => s.stockList);
  const showList = useMemo(() => {
    if (currentTab === "all") {
      return stockList;
    }

    return stockList.filter((item) => {
      return item.region === currentTab;
    });
  }, [currentTab, stockList]);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {tabs.map((item) => {
          return (
            <div
              key={item.key}
              className={`${styles.tab} ${
                currentTab === item.key ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentTab(item.key);
              }}
            >
              <div className={styles.tabName}>{item.name}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.listHeader}>
        <div className="flex-1">名称</div>
        <div className="w-[50px] text-end">现价</div>
        <div className="w-[100px] text-right">涨跌幅</div>
      </div>

      {showList.length === 0 ? (
        <div className={styles.empty}>暂无数据</div>
      ) : (
        <>
          {showList.map((item) => (
            <div className={styles.line} key={item.symbol}>
              <div className="flex-1 flex items-center gap-[8px]">
                {item.logo ? (
                  <img src={item.logo} alt="" className={styles.logo} />
                ) : (
                  <div className={styles.logo}></div>
                )}

                <div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.symbol}>{item.symbol}</div>
                </div>
              </div>

              <div className={styles.price}>{item.current.toFixed(2)}</div>
              <div className="w-[100px] text-right">
                <RateNum num={item.percent} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
