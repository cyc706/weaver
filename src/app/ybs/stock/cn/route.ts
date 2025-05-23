import { getStockData } from "@/lib/stock";

export async function GET() {
  const result = await getStockData([
    "SH600519",
  ]);
  return Response.json(result);
}
