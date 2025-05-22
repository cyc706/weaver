"use client";

import { ReactNode, useState } from "react";
import styles from "./styles.module.css";

export interface TabItem {
  key: string;
  label: string | ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export default function Tabs({ items, activeKey, onChange, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(activeKey || (items.length > 0 ? items[0].key : ""));

  const handleTabClick = (key: string) => {
    setActiveTab(key);

    if (!onChange) {
      return;
    }
    onChange(key);
  };

  return (
    <div className={`${styles.tabContainer} ${className}`}>
      {items.map((item) => (
        <div
          key={item.key}
          className={`${styles.tab} ${activeTab === item.key ? styles.tabActive : ""}`}
          onClick={() => handleTabClick(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}