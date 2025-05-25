import { getSearchStockData } from "@/lib/stock";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const result = await getSearchStockData(code || "");
  return Response.json(result);
}
