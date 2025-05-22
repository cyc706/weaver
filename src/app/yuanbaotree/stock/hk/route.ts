import { getStockData } from "@/lib/stock";

export async function GET() {
  const result = await getStockData([
    "09988", "01024", "02015", "01810", "09868", "09992", "03690", "09866", "09863", "02202", "02097",
  ]);
  return Response.json(result);
}
