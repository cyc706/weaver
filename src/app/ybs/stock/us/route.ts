import { getStockData } from "@/lib/stock";

export async function GET() {
  const result = await getStockData([
    "TSLA",
    "NVDA",
    "META",
    "AMZN",
    "GOOGL",
    "MSFT",
    "AAPL",
  ]);
  return Response.json(result);
}
