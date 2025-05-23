"use client";

import PageList from "./components/PageList";
import { useYbsStore } from "@/app/ybs/store";
import { useEffect } from "react";

export default function YBS() {
  const loading = useYbsStore((state) => state.loading);
  const init = useYbsStore((state) => state.init);
  useEffect(() => {
    init();
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PageList />
    </div>
  );
}