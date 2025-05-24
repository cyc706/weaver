import axios from "axios";
import { FEStock } from "@/types/fe";

export async function apiGetStockList(): Promise<FEStock[]> {
  try {
    const result = await axios.request({
      url: "/ybs/stock/list",
    });

    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


// export async function apiSearchStock: Promise<FEStock[]> {
//   try {
//     const result = await axios.request({
//       url: "/ybs/stock/list",
//     });

//     return result.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// }