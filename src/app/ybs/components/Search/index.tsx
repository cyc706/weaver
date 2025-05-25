"use client";
import styles from "./index.module.css";
import { useYbsStore } from "@/app/ybs/store";
import { useSearchStore } from "@/app/ybs/components/Search/store";
// import { ReactComponent as Logo } from '';
import Image from "next/image";

export default function Search() {
  const show = useSearchStore((state) => state.show);
  const setShow = useSearchStore((state) => state.setShow);
  const input = useSearchStore((state) => state.input);
  const setInput = useSearchStore((state) => state.setInput);
  const list = useSearchStore((state) => state.list);
  const stockList = useYbsStore((state) => state.stockList);
  const addStock = useYbsStore((state) => state.addStock);

  return (
    <div className={styles.container}>
      <div
        style={{ display: !show ? "" : "none" }}
        className={styles.searchWrap}
        onClick={() => setShow(true)}
      >
        <Image
          src="/search.svg"
          alt="search"
          width={24}
          height={24}
          className={styles.searchIcon}
        />
      </div>

      <div className={styles.shadow} style={{ display: show ? "" : "none" }}>
        <div className={styles.inputWrap}>
          <div className={styles.input}>
            <input
              className={styles.realInput}
              autoComplete="off"
              placeholder="搜索股票"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          <div
            className={styles.cancel}
            onClick={() => {
              setShow(false);
            }}
          >
            取消
          </div>
        </div>

        <div className={styles.resultWrap}>
          {list.map((item) => (
            <div className={styles.line} key={item.symbol}>
              <div className={styles.nameWrap}>
                <div>{item.name}</div>
                <div>
                  <div className={styles.symbol}>{item.symbol}</div>
                </div>
              </div>
              <div className={styles.action}>
                <div className={styles.actionIcon}>
                  {stockList.find(
                    (stock) => stock.symbol === item.symbol
                  ) ? null : (
                    <Image
                      src="/add.svg"
                      alt="add"
                      width={24}
                      height={24}
                      className={styles.addIcon}
                      onClick={() => {
                        addStock(item.symbol);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
