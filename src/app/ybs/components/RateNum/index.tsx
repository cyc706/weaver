"use client";
import styles from "./index.module.css";

export default function RateNum(props: { num: number; triangle: boolean }) {
  const { num, triangle } = props;
  const isPositive = num >= 0;

  if (isPositive) {
    return (
      <div className="flex items-center justify-end gap-[4px]">
        <div className={styles.rise}>+{num}%</div>
        {triangle && <div className={styles.triangleRise}></div>}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-[4px]">
      <div className={styles.down}>{num}%</div>
      {triangle && <div className={styles.triangleDown}></div>}
    </div>
  );
}
