import axios from "axios";
import { FEStock } from "@/types/fe";

export async function apiGetStockList(codeList: string): Promise<FEStock[]> {
  try {
    const result = await axios.request({
      url: "/ybs/server/list",
      params: {
        codeList,
      }
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


export async function apiSearchStock(code: string): Promise<FEStock[]> {
  try {
    const result = await axios.request({
      url: "/ybs/server/search",
      params: {
        code,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}